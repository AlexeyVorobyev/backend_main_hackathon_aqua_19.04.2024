import { UserEntity } from '../entity/user.entity'
import { Builder } from 'builder-pattern'
import { UserAttributes } from '@modules/user/attributes/user.attributes'


export const userEntityToUserAttributesDtoAdapter = (userEntityInstance: UserEntity): UserAttributes => {
    const userAttributesDtoBuilder = Builder<UserAttributes>()
    userAttributesDtoBuilder
        .id(userEntityInstance.id)
        .externalId(userEntityInstance.externalId)
        .bonusPoints(userEntityInstance.bonusPoints)
        .sex(userEntityInstance.sex)
        .dateOfBirth(new Date(userEntityInstance.dateOfBirth))
        .updatedAt(new Date(userEntityInstance.updatedAt))
        .createdAt(new Date(userEntityInstance.createdAt))

    return userAttributesDtoBuilder.build()
}
