import {registerEnumType} from '@nestjs/graphql'
import {ERole} from '@src/shared-modules/common/enum/role.enum'

export enum EInternalRole {
    user = 'User',
    business = 'Business',
    administration = 'Administration',
    techAdmin = 'TechAdmin'
}