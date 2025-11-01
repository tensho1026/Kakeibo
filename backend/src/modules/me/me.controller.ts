// src/me/me.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { MeService } from './me.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMe(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.meService.findMe(req.user.userId);
  }
}
