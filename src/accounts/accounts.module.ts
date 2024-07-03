import { Module, forwardRef } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LeadsService } from 'src/leads/leads.service';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([Account])],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
