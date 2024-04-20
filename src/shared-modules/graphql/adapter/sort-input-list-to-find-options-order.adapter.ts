import { SortInput } from '@src/shared-modules/graphql/input/sort.input'
import { FindOptionsOrder } from 'typeorm'


export const sortInputListToFindOptionsOrderAdapter = <Entity extends Object>(input: SortInput[], entity: Entity): FindOptionsOrder<Entity> => {
    return Object.fromEntries(
        input
            .filter((sortDtoInstance) => entity.hasOwnProperty(sortDtoInstance.columnName))
            .map((sortDtoInstance) => {
                return [
                    sortDtoInstance.columnName,
                    sortDtoInstance.direction,
                ]
            }),
    ) as FindOptionsOrder<Entity>
}