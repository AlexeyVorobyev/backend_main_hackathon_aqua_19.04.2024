import {Module} from '@nestjs/common'
import {JwtOauth2Module} from '@src/shared-modules/jwt-oauth2/jwt-oauth2.module'
import {BusinessEntity} from '@modules/business/entity/business.entity'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([BusinessEntity]),
        JwtOauth2Module
    ],
    providers: []
})
export class BusinessModule {
}