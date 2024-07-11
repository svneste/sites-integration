import { Account } from 'src/accounts/account.entity';
import { Settings } from 'src/interfaces/settings.interface';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class AccountSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  phone: Settings;

  @Column()
  amoId: number;
}
