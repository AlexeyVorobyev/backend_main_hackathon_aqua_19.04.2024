import {registerEnumType} from '@nestjs/graphql'

export enum EUserSex {
    male = 'male',
    female = 'female',
    notStated = 'notStated'
}

registerEnumType(EUserSex, {
    name: 'EUserSex'
})