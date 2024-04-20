import {Column, Entity, ManyToMany} from 'typeorm'
import {DefaultDatabaseEntity} from '@src/shared-modules/database/entity/default-database.entity'
import {UserEntity} from '@modules/user/entity/user.entity'

@Entity({
    name: 'business',
})
export class BusinessEntity extends DefaultDatabaseEntity<BusinessEntity> {
    @Column({
        nullable: true
    })
    clients: Number

    @ManyToMany(
        () => UserEntity,
        user => user.business,
        {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        },
    )
    owners: UserEntity[]
}