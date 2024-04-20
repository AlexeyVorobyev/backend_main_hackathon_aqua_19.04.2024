import {Module} from '@nestjs/common'
import {UserEntity} from '@modules/user/entity/user.entity'
import {JwtOauth2Module} from '@src/shared-modules/jwt-oauth2/jwt-oauth2.module'
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtOauth2Module
    ],
    providers: []
})
export class UserModule {
}