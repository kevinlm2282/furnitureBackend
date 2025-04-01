import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { LoggerModule } from 'nestjs-pino'
import { Request, Response } from 'express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from './db/config/database.config'
import { AuthModule } from './auth/auth.module'
import { ItemsModule } from './items/items.module'
import { ConfigModule } from '@nestjs/config'
import { TerminusModule } from '@nestjs/terminus'

@Module({
  imports: [
    AuthModule,
    TerminusModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  singleLine: true,
                  colorize: true,
                },
              }
            : undefined,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        customProps: (req: Request, res: Response) => ({
          context: 'HTTP',
        }),
        customLogLevel: (req: Request, res: Response, error: Error) => {
          if (res.statusCode >= 400 && res.statusCode < 500) return 'warn'
          if (res.statusCode >= 500 || error) return 'error'
          return 'info'
        },
      },
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
