import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { CasbinService } from '../services/casbin.service'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(
    private readonly casbinService: CasbinService,
    private readonly logger: PinoLogger,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request['user'] as { id: number; role: string } | undefined
    if (!user || typeof user.id !== 'number') {
      throw new UnauthorizedException('User not authenticated')
    }

    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated')
    }
    const { method, url } = request

    this.logger.info(`role ${JSON.stringify(user.role)}`)
    this.logger.info(`method: ${method}, url: ${url}, user: ${user.role}`)
    const hasPermission = await this.casbinService.enforce(
      user.role,
      url.split('?')[0],
      method,
    )
    this.logger.info(`hasPermission ${hasPermission}`)
    if (!hasPermission) {
      throw new UnauthorizedException('User does not have permission')
    }

    return true
  }
}
