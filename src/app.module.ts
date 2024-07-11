import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { LeadsModule } from './leads/leads.module';
import { AccountSettingsModule } from './account-settings/account-settings.module';
import { AccountSettingsController } from './account-settings/account-settings.controller';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5438,
      username: 'svneste3',
      password: '3704',
      database: 'nsvwidget',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountsModule,
    AuthModule,
    LeadsModule,
    AccountSettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
