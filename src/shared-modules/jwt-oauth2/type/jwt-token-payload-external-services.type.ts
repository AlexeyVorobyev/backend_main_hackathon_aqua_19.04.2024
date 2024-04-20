import {
    TJwtTokenPayloadExternalRoles
} from '@src/shared-modules/jwt-oauth2/type/jwt-token-payload-external-roles.type'


export type TJwtTokenPayloadExternalServices = {
    id: string
    name: string
    recognitionKey: string
    roles: TJwtTokenPayloadExternalRoles[]
}