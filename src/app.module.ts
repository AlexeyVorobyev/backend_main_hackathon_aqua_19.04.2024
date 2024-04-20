import { Module } from '@nestjs/common'
import { RootResolver } from '@src/app.resolver'
import { GraphqlModule } from '@src/shared-modules/graphql/graphql.module'
import { DatabaseModule } from '@src/shared-modules/database/database.module'
import { JwtOauth2Module } from '@src/shared-modules/jwt-oauth2/jwt-oauth2.module'
import { ConfigModule } from '@modules/config/config.module'

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        JwtOauth2Module,
        GraphqlModule,
    ],
    providers: [
        RootResolver,
    ],
})
export class AppModule {
}
