import { Logger } from 'winston';

export interface ILogger extends Logger {}

export abstract class ILogger implements Logger {}
