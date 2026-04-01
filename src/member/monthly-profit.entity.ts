import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity('monthly_profits')
export class MonthlyProfit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; // Store as "DD-MM-YYYY" or use a Date object if preferred

  @Column('decimal', { precision: 12, scale: 2 })
  profit: number;

  @Column('decimal', { precision: 12, scale: 2 })
  loss: number;

  @Column('decimal', { precision: 12, scale: 2 })
  netTotal: number;

  @ManyToOne(() => Member, (member) => member.monthlyProfits, { onDelete: 'CASCADE' })
  member: Member;

  @Column()
  memberId: number;
}
