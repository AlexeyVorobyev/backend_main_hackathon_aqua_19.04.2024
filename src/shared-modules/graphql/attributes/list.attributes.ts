import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { DefaultAttributes } from '@src/shared-modules/graphql/attributes/default.attributes'
import { ListMetaAttributes } from '@src/shared-modules/graphql/attributes/list-meta.attributes'


export function listAttributesFactory<Entity>(classRef: Type<Entity>) {
    @ObjectType()
    class ListAttributes extends DefaultAttributes {
        @Field(() => [classRef])
        public data: Entity[]

        @Field(() => ListMetaAttributes)
        public meta: ListMetaAttributes
    }

    return ListAttributes
}