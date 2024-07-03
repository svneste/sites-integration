import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('leads')
export class Leads {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  createdLead: number;

  @Column()
  updatedLead: number;

  @Column({ nullable: true })
  closedLead: number;

  @Column()
  idLead: number;

  @Column()
  leadName: string;

  @Column()
  responsible_user: string;

  @Column()
  status_id: string;

  @Column()
  pipeline_id: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  invoice: number;

  @Column({ nullable: true })
  bill: number;
}
