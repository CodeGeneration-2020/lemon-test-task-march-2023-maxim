import { Injectable, Logger } from '@nestjs/common';
import { outputFileSync } from 'fs-extra';

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super();
  }

  log(message: string, file: string) {
    const logMessage = this.formatMessage(message);
    outputFileSync(file, logMessage + '\n', { flag: 'a' });
    super.log(message, file);
  }

  private formatMessage(message: string) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${message}`;
  }
}
