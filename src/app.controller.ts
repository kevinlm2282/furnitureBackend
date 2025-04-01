import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { readFileSync } from 'fs'
import { join } from 'path'

@Controller()
export class AppController {
  constructor(
    private healthCheckService: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    const packageJson = JSON.parse(
      readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
    ) as { version: string }
    return this.healthCheckService.check([
      async () => this.db.pingCheck('database'),
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024), // Límite de 150MB
      () => ({
        custom: {
          status: 'up',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          memoryUsage: process.memoryUsage(),
          version: packageJson.version,
        },
      }),
    ])
  }
}
