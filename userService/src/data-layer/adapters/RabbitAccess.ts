import { connect, Options, Connection, Channel } from 'amqplib';
import { logger } from '@app/middleware/common/Logging';
import { isNull } from '@app/utils/TypeGuards';

export default class RabbitAccess {

	private rabbitConnection: Connection | null;
	private rabbitChannel:    Channel    | null;
	
	public constructor(
		private readonly config: Options.Connect = {},
		private readonly queues: string[] = []
	) {
		this.rabbitConnection = null;
		this.rabbitChannel    = null;
	}

	public async connect() {
		
		this.rabbitConnection = await connect(this.config);

		this.rabbitConnection.on('error', (err) => {
			logger.error(`Rabbit default connection error: ${err}`);
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

		this.rabbitChannel = await this.rabbitConnection.createChannel();

		this.rabbitChannel.on('close', () => {
			logger.info('Rabbit default channel is closed');
		});

		this.rabbitChannel.on('error', (err) => {
			logger.error(`Rabbit default channel connection error: ${err}`);
		});

		this.rabbitChannel.on('return', (msg) => {
			logger.warning(`Rabbit default channel message cannot be routed: ${msg}`);
		});

		this.rabbitChannel.on('drain', () => {
			logger.warning('Rabbit default channel is drained');
		});

		this.queues.forEach(queue => this.rabbitChannel!.assertQueue(queue, { durable: true }));		
	}

	public async send(queueName: string, message: any) {

		if (!this.queues.includes(queueName)) {
			throw new Error('Unspecified queue');
		}

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
	
}
