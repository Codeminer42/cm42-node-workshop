import { config } from 'dotenv';

config();

export const LOG_FILE = process.env.LOG_FILE;
export const PORT = process.env.PORT;
