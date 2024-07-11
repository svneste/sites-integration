import { AccountSettings } from 'src/account-settings/entities/account-settings.entity';
import { OAuthField } from 'src/interfaces/oauth-field.interface';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('account-intsite')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amoId: number;

  @Column()
  domain: string;

  @Column({ nullable: true })
  hash: string;

  get url(): string {
    return `https://${this.domain}`;
  }

  @Column({ type: 'json' })
  oauth: OAuthField;

}
