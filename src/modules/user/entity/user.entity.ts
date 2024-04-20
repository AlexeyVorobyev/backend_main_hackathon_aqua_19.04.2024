import {Column, Entity} from 'typeorm'
import {DefaultDatabaseEntity} from '@src/shared-modules/database/entity/default-database.entity'
import {databaseDateTransformer} from '@src/shared-modules/database/transformer/database-date.transformer'
import {EUserSex} from '@modules/user/enum/user-sex.enum'

@Entity({
  name: 'user',
})
export class UserEntity extends DefaultDatabaseEntity<UserEntity> {
  @Column({name: 'external_id', unique: true})
  externalId: string

  @Column({
    type: 'timestamptz',
    transformer: databaseDateTransformer,
    nullable: true,
    name: 'date_of_birth'
  })
  dateOfBirth?: Date

  @Column({
    enum: EUserSex,
    default: EUserSex.notStated
  })
  sex: EUserSex
}