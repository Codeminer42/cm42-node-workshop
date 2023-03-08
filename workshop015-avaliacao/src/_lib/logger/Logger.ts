import Pino, { Logger as PLogger } from 'pino';

const logger = Pino();
type Logger = PLogger;

export { logger };
export type { Logger };
