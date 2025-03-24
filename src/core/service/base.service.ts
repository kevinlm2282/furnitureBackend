import { Injectable } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class BaseService {
  protected readonly logger: PinoLogger

  constructor(logger: PinoLogger) {
    this.logger = logger
  }
}
