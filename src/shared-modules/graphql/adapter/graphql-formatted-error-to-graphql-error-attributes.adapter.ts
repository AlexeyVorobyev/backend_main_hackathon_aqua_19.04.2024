
import { Builder } from 'builder-pattern'
import { GraphqlErrorAttributes } from '@src/shared-modules/graphql/attributes/graphql-error.attributes'

export const graphqlFormattedErrorToGraphqlErrorAttributesAdapter = (error: any) => (
    error.extensions.originalError
        ? Builder<GraphqlErrorAttributes>()
            .message(error.extensions.originalError.message)
            .error(error.extensions.originalError.error)
            .statusCode(error.extensions.originalError.statusCode)
            .build()
        : error
)