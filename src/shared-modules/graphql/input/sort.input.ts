import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { ESortDirection } from '@src/shared-modules/graphql/enum/sort-direction.enum'

registerEnumType(ESortDirection, { name: 'ESortDirection' })

@InputType('TSortInput')
export class SortInput {
    @IsString()
    @IsNotEmpty()
    @Field(() => String!, {
        description: 'Name of column',
        nullable: true
    })
    columnName: string
    @IsString()
    @IsNotEmpty()
    @Matches(/^(ASC|DESC)$/g)
    @Field(() => ESortDirection!, {
        description: 'Sort direction',
        nullable: true
    })
    direction: ESortDirection
}