import {
    AbstractTypeormRepositoryFactory, Constructor
} from '@src/shared-modules/database/factory/abstract-typeorm-repository.factory'
import {BusinessEntity} from '@modules/business/entity/business.entity'

export class BusinessRepository extends AbstractTypeormRepositoryFactory<BusinessEntity>(BusinessEntity as Constructor<BusinessEntity>) {
}