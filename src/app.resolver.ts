import { Query, Resolver } from '@nestjs/graphql'
import {UserQueries} from '@modules/user/resolver/user-query.resolver'

@Resolver('root')
export class RootResolver {
    @Query(() => UserQueries, { name: 'user' })
    userQueries() {
        return new UserQueries()
    }
}