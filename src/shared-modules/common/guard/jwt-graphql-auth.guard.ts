import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common'
import {Request} from 'express'
import {Builder} from 'builder-pattern'
import {GqlExecutionContext} from '@nestjs/graphql'
import {JwtOauth2Service} from '@src/shared-modules/jwt-oauth2/jwt-oauth2.service'
import {UniversalError} from '@src/shared-modules/common/class/universal-error'
import {REQUEST_USER_KEY} from '@src/shared-modules/common/constant'
import {EUniversalExceptionType} from '@src/shared-modules/common/enum/exceptions'
import {UserRepository} from '@modules/user/user.repository'
import {UserEntity} from '@modules/user/entity/user.entity'

@Injectable()
export class JwtGraphQLAuthGuard implements CanActivate {
    constructor(
        private JwtOauth2Service: JwtOauth2Service,
        private userRepository: UserRepository
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context).getContext().req
        const token = this.getToken(ctx)
        if (!token) {
            Builder(UniversalError)
                .messages(['Authorization token is required'])
                .exceptionBaseClass(EUniversalExceptionType.unauthorized)
                .build().throw()
        }

        const tokenData = await this.JwtOauth2Service.verifyToken(token)

        const osnoServiceData = tokenData.services.find((item) => item.recognitionKey === 'osno')

        if (!osnoServiceData) {
            Builder(UniversalError)
                    .messages(['User doesnt belong to this service'])
                .exceptionBaseClass(EUniversalExceptionType.unauthorized)
                .build().throw()
        }

        try {
            await this.userRepository.getOne({
                externalId: tokenData.id
            })
        } catch (e) {
            await this.userRepository.saveOne(
                Builder<UserEntity>()
                    .externalId(tokenData.id)
                    .build()
            )
        }

        ctx[REQUEST_USER_KEY] = tokenData

        return true
    }

    private getToken(request: Request) {
        const [_, token] = request.headers.authorization?.split(' ') ?? []
        return token
    }
}