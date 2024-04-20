import {Field, ObjectType} from '@nestjs/graphql'
import {DefaultEntityAttributes} from '@src/shared-modules/graphql/attributes/default-entity.attributes'
import {EUserSex} from '@modules/user/enum/user-sex.enum'


@ObjectType('TUserAttributes')
export class UserAttributes extends DefaultEntityAttributes {
    @Field(() => String!, {
        description: 'Id of user external',
    })
    externalId: string

    @Field(() => EUserSex!, {
        description: 'User sex',
    })
    sex: EUserSex

    @Field(() => Number!, {
        description: 'User bonus points',
    })
    bonusPoints: number

    @Field(() => Date!, {
        description: 'Date of birth',
    })
    dateOfBirth: Date
}