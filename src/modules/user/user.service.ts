import {UserRepository} from '@modules/user/user.repository'
import {Inject, Injectable} from '@nestjs/common'
import {FindOptionsWhere} from 'typeorm'
import {UserEntity} from '@modules/user/entity/user.entity'

@Injectable()
export class UserService {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) {
    }

    async getAll(input: UserListInput): Promise<UserListAttributes> {
        const filter: FindOptionsWhere<UserEntity> = {
            ...listInputToFindOptionsWhereAdapter<UserEntity>(input),
            role: input.roleFilter,
            externalServices: {
                id: input.externalServiceFilter ? In(input.externalServiceFilter) : undefined,
            },
            externalRoles: {
                id: input.externalRoleFilter ? In(input.externalRoleFilter) : undefined,
            },
        }

        const userEntityInstances = await this.userRepository.getAll(
            filter,
            sortInputListToFindOptionsOrderAdapter<UserEntity>(
                input.sort,
                Builder<UserEntity>()
                    .id(null).email(null).password(null)
                    .createdAt(null).updatedAt(null)
                    .verified(null).role(null)
                    .build(),
            ),
            input.page,
            input.perPage,
            {
                externalServices: {
                    externalRoles: true
                },
                externalRoles: {
                    externalService: true
                },
            },
        )

        const totalElements = await this.userRepository.count(filter)

        const userListAttributesBuilder = Builder<UserListAttributes>()
        userListAttributesBuilder
            .data(
                userEntityInstances
                    .map((userEntityInstance: UserEntity) => userEntityToUserAttributesDtoAdapter(userEntityInstance)),
            )
            .meta(
                Builder<ListMetaAttributes>()
                    .currentPage(input.page)
                    .elementsPerPage(input.perPage)
                    .totalElements(totalElements)
                    .totalPages(Math.ceil(totalElements / input.perPage))
                    .build(),
            )
        return userListAttributesBuilder.build()
    }

    async getOne(id: string): Promise<UserAttributes> {
        const user = await this.userRepository.getOne(
            { id: id },
            {
                externalServices: {
                    externalRoles: true
                },
                externalRoles: {
                    externalService: true
                },
            },
        )
        return userEntityToUserAttributesDtoAdapter(user)
    }