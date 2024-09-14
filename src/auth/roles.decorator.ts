import { SetMetadata } from '@nestjs/common';

// Custom decorator to define roles for routes
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
