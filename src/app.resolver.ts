import { Query, Resolver } from '@nestjs/graphql'

@Resolver('root')
export class RootResolver {
    @Query(() => [String], {
        name: 'test'
    })
    test() {
        return ['test']
    }
}