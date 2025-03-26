import { Injectable, OnModuleInit } from '@nestjs/common'
import { Enforcer, newEnforcer } from 'casbin'
import { AppDataSource } from 'src/db/config/database.config'
import TypeORMAdapter from 'typeorm-adapter'
import { PinoLogger } from 'nestjs-pino'
import { CasbinRuleCreateDto } from '../dtos/casbin_rule.create.dto'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'

@Injectable()
export class CasbinService implements OnModuleInit {
  private enforcer: Enforcer
  constructor(private logger: PinoLogger) {}

  async onModuleInit() {
    await this.initEnforcer()
  }

  async initEnforcer() {
    const adapter = await TypeORMAdapter.newAdapter(AppDataSource.options)
    this.enforcer = await newEnforcer('src/casbin_conf/model.conf', adapter)
    await this.enforcer.loadPolicy()
  }

  async enforce(sub: string, obj: string, act: string) {
    return await this.enforcer.enforce(sub, obj, act)
  }

  async addPolicy(casbinRule: CasbinRuleCreateDto) {
    return await this.enforcer.addPolicy(
      casbinRule.subject,
      casbinRule.object,
      casbinRule.action,
    )
  }

  async getPolicies(queryParams: QueryParamsDto) {
    const { page, size, filter } = queryParams
    const policies = await this.enforcer.getPolicy()
    const filteredPolicies = (
      filter
        ? policies.filter((policy) =>
            policy.some((value) =>
              value.toLowerCase().includes(filter.toLowerCase()),
            ),
          )
        : policies
    ).map((policy) => ({
      subject: policy[0],
      object: policy[1],
      action: policy[2],
    }))
    return {
      content: filteredPolicies.slice((page - 1) * size, page * size),
      totalElements: filteredPolicies.length,
      size,
      page,
    }
  }

  async removePolicy(casbinRule: CasbinRuleCreateDto) {
    return await this.enforcer.removePolicy(
      casbinRule.subject,
      casbinRule.object,
      casbinRule.action,
    )
  }

  async updatePolicy(
    oldCasbinRule: CasbinRuleCreateDto,
    newCasbinRule: CasbinRuleCreateDto,
  ) {
    return await this.enforcer.updatePolicy(
      [oldCasbinRule.subject, oldCasbinRule.object, oldCasbinRule.action],
      [newCasbinRule.subject, newCasbinRule.object, newCasbinRule.action],
    )
  }
}
