import {JwtModule, JwtService} from '@nestjs/jwt'
import {Module} from '@nestjs/common'
import {ConfigModule, ConfigService} from '@nestjs/config'
import * as fs from 'node:fs'
import * as path from 'node:path'

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                publicKey: fs.readFileSync(path.resolve('keys/rsa.key.pub'), 'utf8'),
                verifyOptions: {
                    algorithms: ['RS256'],
                },
                signOptions: {
                    algorithm: 'RS256',
                    expiresIn: configService.get('jwt.accessTokenTtl') / 1000,
                },
            }),
        })],
    providers: [{
        provide: 'JwtAccessService',
        useExisting: JwtService,
    }],
    exports: ['JwtAccessService'],
})
export class JwtAccessModule {
}