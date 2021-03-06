import { connect, Options, Connection, Channel } from 'amqplib';
import { logger } from '@app/middleware/common/Logging';
import { isNull } from '@app/utils/TypeGuards';
import { getEnvVar } from '@app/utils/Configuration';
import { PromiseAccess, ItemChainCb } from './BaseAccess';

export default class RabbitAccess extends PromiseAccess<Options.Connect> {

	private RECONNECT_INTERVAL = 5000; // in ms
	private MAX_RETRY_COUNT    = 5;

	private rabbitConnection: Connection | null = null;
	private rabbitChannel:    Channel    | null = null;

	public getDefaultEnvConfig() {
		return {
			hostname:  getEnvVar('RABBITMQ_HOSTNAME'),
			port:     +getEnvVar('RABBITMQ_PORT'),
			username:  getEnvVar('RABBITMQ_USERNAME'),
			password:  getEnvVar('RABBITMQ_PASSWORD'),
		};
	}
	
	public async connect() {
		this.tryConnect(1);
	}

	private async tryConnect(tryCount: number) {

		logger.info(`Connecting to RabbitMQ: ${JSON.stringify(this.config)}`);
		
		try {
			this.rabbitConnection = await connect(this.config);
			logger.info('Connection to RabbitMQ is opened');
			// TODO: may be fulfill only when connection channel is ready
			this.resolve(null)
		} catch(err) {
			
			logger.error(`Error connecting to RabbitMQ: ${err}`);

			if (tryCount >= this.MAX_RETRY_COUNT) {
				logger.error(`Max retry count exceeded. Last error: ${err}`);
				this.reject(err);
				return;
			}

			logger.info('Reconnecting to RabbitMQ ...');
			setTimeout(() => this.tryConnect(tryCount + 1), this.RECONNECT_INTERVAL);
			
			return;
		}
		
		this.rabbitConnection.on('error', (err) => {
			logger.error(`Rabbit default connection error: ${err}`);
			logger.info('Reconnecting to RabbitMQ ...');
			setTimeout(() => this.tryConnect(1), this.RECONNECT_INTERVAL);
		});

		this.rabbitConnection.on('close', () => {
			logger.info('Rabbit default connection is closed');
		});

		this.rabbitConnection.on('blocked', (reason) => {
			logger.crit(`Rabbit default connection is blocked, reason: ${reason}`);
		});

		this.rabbitConnection.on('unblocked', () => {
			logger.info('Rabbit default connection is unblocked');
		});

		process.on('SIGINT', async () => {
			if (!isNull(this.rabbitConnection)) {
				await this.rabbitConnection.close();
				logger.info('Rabbit connection is disconnected through app termiation.');
			}
			process.exit(0);
		});

		this.createChannel();
	}

	public async createChannel() {
		
		if (isNull(this.rabbitConnection)) {
			throw new Error('Rabbit default connection is not established');
		}

		try {
			this.rabbitChannel = await this.rabbitConnection.createChannel();
			logger.info('Channel connection to RabbitMQ is opened');
		} catch(err) {
			logger.error(`Error establishing connection channel to RabbitMQ: ${err}`);
			logger.info('Re-establishing connection channel to RabbitMQ');
			setTimeout(this.createChannel.bind(this), this.RECONNECT_INTERVAL);
			return;
		}

		this.rabbitChannel.on('close', () => {
			logger.info('Rabbit default channel is closed');
		});

		this.rabbitChannel.on('error', (err) => {
			logger.error(`Rabbit default channel connection error: ${err}`);
			logger.info('Re-establishing connection channel to RabbitMQ');
			setTimeout(this.createChannel.bind(this), this.RECONNECT_INTERVAL);
		});

		this.rabbitChannel.on('return', (msg) => {
			logger.warning(`Rabbit default channel message cannot be routed: ${msg}`);
		});

		this.rabbitChannel.on('drain', () => {
			logger.warning('Rabbit default channel is drained');
		});	
	}

	public async sendToQueue(queueName: string, message: any) {
		if (isNull(this.rabbitChannel)) {
			throw new Error('Rabbit default channel is not established');
		} else {
			const messageBuffer = Buffer.from(JSON.stringify(message));
			const assertQueue = await this.rabbitChannel.assertQueue(queueName, { durable: true });
			return this.rabbitChannel.sendToQueue(
				assertQueue.queue,
				messageBuffer,
				{ persistent: true }
			)
		}	
	}

	public async publish(exchange: string, routingKey: string, message: any) {
		if (isNull(this.rabbitChannel)) {
			throw new Error('Rabbit default channel is not established');
		}
		const messageBuffer = Buffer.from(JSON.stringify(message));
		return this.rabbitChannel.publish(exchange, routingKey, messageBuffer, { persistent: true });
	}
	
}
