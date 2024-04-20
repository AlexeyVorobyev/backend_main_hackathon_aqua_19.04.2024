import {
    AbstractTypeormRepositoryFactory, Constructor
} from '@src/shared-modules/database/factory/abstract-typeorm-repository.factory'
import {BusinessEntity} from '@modules/business/entity/business.entity'
import {UserEntity} from '@modules/user/entity/user.entity'

export class UserRepository extends AbstractTypeormRepositoryFactory<UserEntity>(UserEntity as Constructor<UserEntity>) {
}