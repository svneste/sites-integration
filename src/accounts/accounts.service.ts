import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { GrantTypes } from 'src/enums/grant-types.enum';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepo: Repository<Account>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  findByAmoId(amoId: number): Promise<Account> {
    return this.accountsRepo.findOne({
      where: {
        amoId: amoId,
      },
    });
  }

  create(data: Partial<Account>): Promise<Account> {
    return this.accountsRepo.save(data);
  }

  async update(id: number, data: Partial<Account>) {
    await this.accountsRepo.save({ ...data, id });
    return this.accountsRepo.findOne({
      where: {
        amoId: id,
      },
    });
  }

  createConnector(amoId: number): any {
    const api = axios.create();
    let account: Account;

    api.interceptors.request.use(
      async (config) => {
        if (!account) account = await this.findByAmoId(amoId);
        const { oauth } = account;

        if (oauth.expire - 60 * 1000 < Number(new Date())) {
          account = await this.update(account.id, {
            oauth: await this.authService.getNewTokens(
              oauth.refreshToken,
              account.domain,
              GrantTypes.RefreshToken,
            ),
          });
          console.log('account', account);
        }

        config.baseURL = `https://${account.domain}`;
        config.headers.Authorization = `Bearer ${account.oauth.accessToken}`;
        return config;
      },
      (e) => Promise.reject(e),
    );

    return api;
  }
}
