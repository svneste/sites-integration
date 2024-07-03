import { All, Body, Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}
  @All('/webhook')
  async getInfoLead(@Body() body) {
    console.log('запущен хук');
    let leadId;
   
  }
}
