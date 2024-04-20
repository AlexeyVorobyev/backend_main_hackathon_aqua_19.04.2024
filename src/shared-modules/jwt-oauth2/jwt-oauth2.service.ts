import { Inject, Injectable } from '@nestjs/common'
import { JwtService as JwtNestService } from '@nestjs/jwt'
import { UniversalError } from '@src/shared-modules/common/class/universal-error'
import { Builder } from 'builder-pattern'
import { TJwtTokenPayload } from '@src/shared-modules/jwt-oauth2/type/jwt-token-payload.type'
import { EUniversalExceptionType } from '@src/shared-modules/common/enum/exceptions'


@Injectable()
export class JwtOauth2Service {
    constructor(
        @Inject('JwtAccessService')
        private jwtAccessService: JwtNestService,
    ) {
    }

    async verifyToken(jwtToken: string): Promise<TJwtTokenPayload> {
        try {
            return await this.jwtAccessService.verifyAsync<TJwtTokenPayload>(jwtToken)
        } catch (error) {
            Builder(UniversalError)
                .messages([error.message])
                .exceptionBaseClass(EUniversalExceptionType.badRequest)
                .build().throw()
        }
    }
}