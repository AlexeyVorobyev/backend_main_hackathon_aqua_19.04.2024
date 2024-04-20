import {UserRepository} from '@modules/user/user.repository'
import {Inject, Injectable} from '@nestjs/common'
import {FindOptionsWhere} from 'typeorm'
import {UserEntity} from '@modules/user/entity/user.entity'
import {
    sortInputListToFindOptionsOrderAdapter,
} from '@src/shared-modules/graphql/adapter/sort-input-list-to-find-options-order.adapter'
import {Builder} from 'builder-pattern'
import {
    listInputToFindOptionsWhereAdapter,
} from '@src/shared-modules/graphql/adapter/list-input-to-find-options-where.adapter'
import {UserListInput} from '@modules/user/input/user-list.input'
import {UserListAttributes} from '@modules/user/attributes/user-list.attributes'
import {userEntityToUserAttributesDtoAdapter} from '@modules/user/adapter/user-entity-to-user-attributes-dto.adapter'
import {ListMetaAttributes} from '@src/shared-modules/graphql/attributes/list-meta.attributes'
import {UserAttributes} from '@modules/user/attributes/user.attributes'

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
        }

        const userEntityInstances = await this.userRepository.getAll(
            filter,
            sortInputListToFindOptionsOrderAdapter<UserEntity>(
                input.sort,
                Builder<UserEntity>()
                    .id(null).externalId(null).sex(null)
                    .createdAt(null).updatedAt(null).bonusPoints(null)
                    .build(),
            ),
            input.page,
            input.perPage,
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
            {id: id},
            {
            },
        )
        return userEntityToUserAttributesDtoAdapter(user)
    }
}