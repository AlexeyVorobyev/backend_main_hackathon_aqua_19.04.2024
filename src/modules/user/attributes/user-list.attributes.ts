import { UserAttributes } from '@modules/user/attributes/user.attributes'
import { ObjectType, OmitType } from '@nestjs/graphql'
import {listAttributesFactory} from '@src/shared-modules/graphql/attributes/list.attributes'

@ObjectType('TUserAttributesOmitOperationMeta')
export class UserListAttributesOmitOperationMeta extends OmitType(UserAttributes, ['operationMeta']) {
}
@ObjectType('TUserListAttributes')
export class UserListAttributes extends listAttributesFactory<UserListAttributesOmitOperationMeta>(UserListAttributesOmitOperationMeta) {
}