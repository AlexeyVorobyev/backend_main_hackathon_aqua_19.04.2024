import { DefaultAttributes } from '@src/shared-modules/graphql/attributes/default.attributes'
import { DefaultDatabaseEntity } from '@src/shared-modules/database/entity/default-database.entity'
import { Field, ObjectType } from '@nestjs/graphql'
import { UUID } from '@src/shared-modules/graphql/scalar/uuid.scalar'


@ObjectType('TDefaultEntityAttributes')
export abstract class DefaultEntityAttributes extends DefaultAttributes implements DefaultDatabaseEntity<DefaultEntityAttributes> {
    @Field(() => UUID, {
        description: 'Entity id in UUID format',
    })
    id: string

    @Field(() => Date, {
        description: 'Entity creation datetime',
    })
    createdAt: Date

    @Field(() => Date, {
        description: 'Entity last update datetime',
    })
    updatedAt: Date
}
