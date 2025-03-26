import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { CasbinService } from '../services/casbin.service'
import { AuthService } from '../services/auth.service'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(
    private readonly casbinService: CasbinService,
    private readonly userService: AuthService,
    private readonly logger: PinoLogger,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request['user'] as { id: number } | undefined
    if (!user || typeof user.id !== 'number') {
      throw new UnauthorizedException('User not authenticated')
    }

    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated')
    }
    const { method, url } = request
    const savedUser = await this.userService.findUserById(user.id)
    if (!savedUser) {
      throw new UnauthorizedException('User not authenticated')
    }
    this.logger.info(`savedUser ${JSON.stringify(savedUser)}`)
    this.logger.info(
      `method: ${method}, url: ${url}, user: ${savedUser.roles[0].name}`,
    )
    const hasPermission = await this.casbinService.enforce(
      savedUser.roles[0].name,
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
