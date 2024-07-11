import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Repository } from 'typeorm';
import { Leads } from './entities/leads.entity';
import { InjectRepository } from '@nestjs/typeorm';
var jwt = require('jsonwebtoken');

@Injectable()
export class LeadsService {
  constructor(
    private accountService: AccountsService,
    @InjectRepository(Leads)
    private leadsRepo: Repository<Leads>
  ) {}

  async getInfoLead(amoId) {
    const api = await this.accountService.createConnector(amoId);

    const lead = await api.get(`/api/v4/leads/custom_fields`);
    console.log(lead.data._embedded);
  }

  async getInfoContact(amoId) {
    const api = await this.accountService.createConnector(amoId);
    const contact = await api.get(`/api/v4/contacts/custom_fields`);
    contact.data._embedded.custom_fields.map((a) => console.log(a));
  }

  async createLead(body, id) {
    const api = this.accountService.createConnector(id);

    await api
      .post('/api/v4/leads/complex', [
        {
          name: 'Новая сделка с сайта',
          _embedded: {
            contacts: [
              {
                name: body.name,

                custom_fields_values: [
                  {
                    field_id: 2252139,
                    field_name: 'Телефон',
                    field_code: 'PHONE',
                    field_type: 'multitext',
                    values: [
                      {
                        value: body.phone,
                      },
                    ],
                  },
                  {
                    field_id: 2252141,
                    field_name: 'Email',
                    field_code: 'EMAIL',
                    field_type: 'multitext',
                    values: [
                      {
                        value: body.email,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ])
      .then(function (res) {
        console.log(res.data);
      });
  }

async getAccountId(id) {
  return await this.accountService.getAccountId(id)
}

  async onModuleInit() {}
}
