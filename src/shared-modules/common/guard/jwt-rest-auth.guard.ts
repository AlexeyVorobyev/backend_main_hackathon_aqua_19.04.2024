import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Builder } from 'builder-pattern'
import { UniversalError } from '@src/shared-modules/common/class/universal-error'
import { JwtOauth2Service } from '@src/shared-modules/jwt-oauth2/jwt-oauth2.service'
import { REQUEST_USER_KEY } from '@src/shared-modules/common/constant'
import { EUniversalExceptionType } from '@src/shared-modules/common/enum/exceptions'

@Injectable()
export class JwtRestAuthGuard implements CanActivate {
	constructor(
		private readonly JwtOauth2Service: JwtOauth2Service,
	) {
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const token = this.getToken(request)
		if (!token) {
			Builder(UniversalError)
				.messages(['Authorization token is required'])
				.exceptionBaseClass(EUniversalExceptionType.unauthorized)
				.build().throw()
		}

		request[REQUEST_USER_KEY] = await this.JwtOauth2Service.verifyToken(token)

		return true
	}

	private getToken(request: Request) {
		const [_, token] = request.headers.authorization?.split(' ') ?? []
		return token
	}
}