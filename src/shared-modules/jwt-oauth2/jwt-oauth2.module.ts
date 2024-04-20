import { Module } from '@nestjs/common'
import { JwtAccessModule } from '@src/shared-modules/jwt-oauth2/strategy/JwtAccess.module'
import { JwtOauth2Service } from '@src/shared-modules/jwt-oauth2/jwt-oauth2.service'

@Module({
    imports: [
        JwtAccessModule,
    ],
    providers: [JwtOauth2Service],
    exports: [JwtOauth2Service],
})
export class JwtOauth2Module {
}