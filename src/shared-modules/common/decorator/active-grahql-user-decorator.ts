import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { GqlExecutionContext } from '@nestjs/graphql'
import { REQUEST_USER_KEY } from '@src/shared-modules/common/constant'
import { TJwtTokenPayload } from '@src/shared-modules/jwt-oauth2/type/jwt-token-payload.type'

export const ActiveGraphQLUser = createParamDecorator(
    (field: keyof TJwtTokenPayload | undefined, ctx: ExecutionContext) => {
        const request = GqlExecutionContext.create(ctx).getContext().req
        const user: TJwtTokenPayload | undefined = request[REQUEST_USER_KEY]
        return field ? user?.[field] : user
    }
)