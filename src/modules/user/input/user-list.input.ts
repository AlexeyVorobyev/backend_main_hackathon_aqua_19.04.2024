import {InputType} from '@nestjs/graphql'
import {ListInput} from '@src/shared-modules/graphql/input/list.input'

@InputType('TUserListInput')
export class UserListInput extends ListInput {

}