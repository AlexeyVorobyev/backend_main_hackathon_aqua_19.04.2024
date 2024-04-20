
import { Field, ObjectType } from '@nestjs/graphql'
import { OperationMetaAttributes } from '@src/shared-modules/graphql/attributes/operation-meta.attributes'

@ObjectType('TDefaultAttributes')
export class DefaultAttributes {
    @Field(() => OperationMetaAttributes!, {
        description: 'Status metadata',
    })
    operationMeta?: OperationMetaAttributes
}