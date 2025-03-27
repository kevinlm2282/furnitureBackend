import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { UserRepository } from './repositories/user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Role } from './entities/role.entity'
import { jwtConstants } from './constants/auth.constants'
import { JwtModule } from '@nestjs/jwt'
import { CasbinService } from './services/casbin.service'
import { RoleService } from './services/role.service'
import { RoleController } from './controllers/roles.controller'
import { RoleRepository } from './repositories/role.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController, RoleController],
  providers: [
    AuthService,
    UserRepository,
    CasbinService,
    RoleService,
    RoleRepository,
  ],
})
export class AuthModule {}
