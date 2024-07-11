import { Module, forwardRef } from '@nestjs/common';
import { AccountSettingsService } from './account-settings.service';
import { AccountSettingsController } from './account-settings.controller';
import { AccountSettings } from './entities/account-settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountSettings]), AccountsModule],
  providers: [AccountSettingsService],
  controllers: [AccountSettingsController],
  exports: [AccountSettingsService]
})
export class AccountSettingsModule {}
