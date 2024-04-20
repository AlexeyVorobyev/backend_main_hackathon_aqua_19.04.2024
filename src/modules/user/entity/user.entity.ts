import {Column, Entity, JoinTable, ManyToMany} from 'typeorm'
import {DefaultDatabaseEntity} from '@src/shared-modules/database/entity/default-database.entity'
import {databaseDateTransformer} from '@src/shared-modules/database/transformer/database-date.transformer'
import {EUserSex} from '@modules/user/enum/user-sex.enum'
import {BusinessEntity} from '@modules/business/entity/business.entity'

@Entity({
    name: 'user',
})
export class UserEntity extends DefaultDatabaseEntity<UserEntity> {
    @Column({name: 'external_id', unique: true})
    externalId: string

    @Column({name: 'bonus_points', default: 0})
    bonusPoints: number

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

    @ManyToMany(
        () => BusinessEntity,
        (businessEntity) => businessEntity.owners,
        {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            eager: true,
        },
    )
    @JoinTable({
        name: 'user_business',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'business_id',
            referencedColumnName: 'id',
        },
    })
    business: BusinessEntity[]
}