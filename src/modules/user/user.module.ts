import {Module} from '@nestjs/common'
import {UserEntity} from '@modules/user/entity/user.entity'

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity])],
  providers: []
})
export class UserModule {}