import { All, Body, Controller, Get, Param, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}
  @All('/webhook')
  async getInfoLead(@Body() body) {

  }

  @All('/create/:id')
  async createLead(@Body() body, @Param('id') id) {
    const account = await this.leadsService.getAccountId(id);
    this.leadsService.createLead(body, account.amoId);
  }
}
