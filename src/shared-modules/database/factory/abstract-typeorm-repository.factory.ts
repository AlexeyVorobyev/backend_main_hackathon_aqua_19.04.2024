import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type'
import { AbstractTypeormRepository } from '@src/shared-modules/database/repository/abstract-typeorm-repository'

export type Constructor<T> = new (...args: any[]) => T
export function AbstractTypeormRepositoryFactory<Entity>(classRef: Constructor<Entity>) {
    @Injectable()
    class FactoredTypeormRepository extends AbstractTypeormRepository<Entity> {
        constructor(
            @InjectRepository(classRef as EntityClassOrSchema) readonly typeormRepository: Repository<Entity>,
        ) {
            super(typeormRepository)
        }
    }

    return FactoredTypeormRepository
}