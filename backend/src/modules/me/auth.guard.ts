import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
