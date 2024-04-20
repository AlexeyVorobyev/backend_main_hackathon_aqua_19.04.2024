import { Args, ObjectType, ResolveField, Resolver } from '@nestjs/graphql'
import { UserAttributes } from '@modules/user/attributes/user.attributes'
import { UserService } from '@modules/user/user.service'
import { Inject, UseGuards, UseInterceptors } from '@nestjs/common'
import { UserListAttributes } from '@modules/user/attributes/user-list.attributes'
import { UserListInput } from '@modules/user/input/user-list.input'
import {OperationMetaInterceptor} from '@src/shared-modules/graphql/interceptor/operation-meta.interceptor'
import {JwtGraphQLAuthGuard} from '@src/shared-modules/common/guard/jwt-graphql-auth.guard'
import {RoleGraphQLGuard} from '@src/shared-modules/common/guard/role-graphql.guard'
import {Roles} from '@src/shared-modules/common/decorator/roles.decorator'
import {EInternalRole} from '@modules/common/enum/role.enum'
import {IdInput} from '@src/shared-modules/graphql/input/id.input'


@ObjectType('TUserQueries')
export class UserQueries {
}

@UseInterceptors(OperationMetaInterceptor)
@Resolver(() => UserQueries)
export class UserQueryResolver {
    constructor(
        @Inject(UserService)
        private userService: UserService,
    ) {
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(EInternalRole.business, EInternalRole.administration)
    @ResolveField(() => UserListAttributes, {
        name: 'list',
        description: 'Provides functionality of getting list of users.',
    })
    async list(
        @Args('input', { nullable: true }) input: UserListInput,
    ) {
        return await this.userService.getAll(input)
    }

    @UseGuards(JwtGraphQLAuthGuard, RoleGraphQLGuard)
    @Roles(EInternalRole.business, EInternalRole.administration)
    @ResolveField(() => UserAttributes, {
        name: 'record',
        description: 'Provides functionality of getting information about user by id.',
    })
    async record(@Args('idInput') idInput: IdInput) {
        return await this.userService.getOne(idInput.id)
    }
}