import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountSettings } from './entities/account-settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AccountSettingsService {
  constructor(
    @InjectRepository(AccountSettings)
    private accountSettingsRepo: Repository<AccountSettings>,
    private accountService: AccountsService
  ) {}

  // поиск уже существующего конфига

  async getSettingsForAccount(accountId) {
    const account = await this.accountService.findByAmoId(accountId);
    if (!account) {
      this.getInfoLead(accountId);
    } else return;
  }

  // Получить информацию по всем полям типа телефон в аккаунте
  async getInfoLead(amoId) {
    let phoneInfo = {
      id: null,
      idWorkPhone: null,
    };
    let idWork;
    const api = await this.accountService.createConnector(amoId);
    const leadInfo = await api.get(`/api/v4/contacts/custom_fields`);

    leadInfo.data._embedded.custom_fields.map((a) => {
      if (a.code === 'PHONE') {
        phoneInfo.id = a.id;
        idWork = a.enums;
      }
    });

    idWork.map((a) => {
      if (a.value === 'WORK') {
        phoneInfo.idWorkPhone = a.id;
      }
    });

    await this.createAccountSettings(phoneInfo, amoId);
  }

  async createAccountSettings(phoneInfo, amoId) {
    const account = await this.accountService.findByAmoId(31208198);

    return await this.accountSettingsRepo.save({
      phone: phoneInfo,
      amoId: amoId,
    });
  }

  // async onModuleInit() {
  //   await this.getInfoLead(31208198);
  // }
}
