import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { UUID } from '@src/shared-modules/graphql/scalar/uuid.scalar'
import { Constructor } from '@src/shared-modules/database/factory/abstract-typeorm-repository.factory'


export function updateEntityInputFactory<Payload>(classRef: Constructor<Payload>) {
    @InputType('TUpdateEntityInput')
    abstract class UpdateEntityInput {
        @IsUUID(4)
        @IsNotEmpty()
        @Field(() => UUID!, {
            description: 'Identification property with uuid signature',
        })
        id: string

        @Field(() => classRef)
        payload: Payload
    }

    return UpdateEntityInput
}