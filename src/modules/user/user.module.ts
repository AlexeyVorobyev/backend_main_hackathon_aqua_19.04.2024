import {Module} from '@nestjs/common'
import {UserEntity} from '@modules/user/entity/user.entity'
import {JwtOauth2Module} from '@src/shared-modules/jwt-oauth2/jwt-oauth2.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UserQueryResolver} from '@modules/user/resolver/user-query.resolver'
import {UserService} from '@modules/user/user.service'
import {UserRepository} from '@modules/user/user.repository'

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtOauth2Module
    ],
    providers: [
        UserRepository,
        UserQueryResolver,
        UserService
    ],
    exports: [
        UserRepository,
        UserQueryResolver,
        UserService
    ]
})
export class UserModule {
}