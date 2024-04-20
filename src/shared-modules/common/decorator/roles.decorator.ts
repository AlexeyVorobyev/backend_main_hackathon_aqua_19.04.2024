import { SetMetadata } from '@nestjs/common'
import { REQUEST_ROLES_KEY } from '../constant'
import { ERole } from '../enum/role.enum'
import {EInternalRole} from '@modules/common/enum/role.enum'

export const Roles = (...roles: EInternalRole[]) => SetMetadata(REQUEST_ROLES_KEY, roles)