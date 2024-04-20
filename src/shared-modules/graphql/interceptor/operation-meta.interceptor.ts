import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { OperationMetaAttributes } from '@src/shared-modules/graphql/attributes/operation-meta.attributes'
import { Builder } from 'builder-pattern'
import { DefaultAttributes } from '@src/shared-modules/graphql/attributes/default.attributes'


@Injectable()
export class OperationMetaInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const beforeTimeStamp = Date.now()

        return next
            .handle()
            .pipe(
                map((data) => {
                    const afterTimeStamp = Date.now()

                    const operationMetaAttributes = Builder<OperationMetaAttributes>()

                    operationMetaAttributes
                        .startTimestamp(beforeTimeStamp)
                        .finishTimestamp(afterTimeStamp)
                        .deltaTimestamp(afterTimeStamp - beforeTimeStamp)

                    console.log(operationMetaAttributes.build(), data)

                    return {
                        ...data,
                        operationMeta: operationMetaAttributes.build(),
                    } as DefaultAttributes
                }),
            )
    }
}