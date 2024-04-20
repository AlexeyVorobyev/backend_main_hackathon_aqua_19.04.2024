import { ERole } from '../../common/enum/role.enum'
import {
	TJwtTokenPayloadExternalServices
} from '@src/shared-modules/jwt-oauth2/type/jwt-token-payload-external-services.type'

export type TJwtTokenPayload = {
	id: string
	email: string
	role: ERole
	tokenId: string
	services: TJwtTokenPayloadExternalServices[]
}