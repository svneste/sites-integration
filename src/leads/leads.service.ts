import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Repository } from 'typeorm';
import { Leads } from './entities/leads.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LeadsService {
  constructor(
    private accountService: AccountsService,
    @InjectRepository(Leads)
    private leadsRepo: Repository<Leads>,
  ) {}

  async createApiService(amoId) {
    return await this.accountService.createConnector(amoId);
  }

  async getLeadInfo(amoId, leadId) {
    const api = await this.createApiService(amoId);

    const lead = await api.get(`/api/v4/leads/${leadId}`);
    return lead.data;
  }

  async saveLeadData(payload, id) {
    const lead = await this.leadsRepo.findOne({
      where: {
        idLead: payload.idLead,
      },
    });

    if (!lead) {
      return await this.leadsRepo.save(payload);
    } else {
      lead.createdLead = payload.createdLead;
      lead.updatedLead = payload.updatedLead;
      lead.closedLead = payload.closedLead;
      lead.leadName = payload.leadName;
      lead.responsible_user = payload.responsible_user;
      lead.status_id = payload.status_id;
      lead.pipeline_id = payload.pipeline_id;
      lead.price = payload.price;
      lead.invoice = payload.invoice;
      lead.bill = payload.bill;
      return await this.leadsRepo.save(lead);
    }
  }

  async createPayload(leadData) {
    const payload = {
      idLead: leadData.id,
      createdLead: leadData.created_at,
      updatedLead: leadData.updated_at,
      closedLead: leadData.closed_at,
      leadName: leadData.name,
      responsible_user: leadData.responsible_user_id,
      status_id: leadData.status_id,
      pipeline_id: leadData.pipeline_id,
      price: leadData.price,
      invoice: null,
      bill: null,
    };
    console.log(leadData);

    leadData.custom_fields_values.map((a) => {
      if (a.field_id === 2687177) {
        a.values.map((a) => (payload.invoice = a.value));
      }
      if (a.field_id === 2687179) {
        a.values.map((a) => (payload.bill = a.value));
      }
    });
    await this.saveLeadData(payload, leadData.id);
  }
}
