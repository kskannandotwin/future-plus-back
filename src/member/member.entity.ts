import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  investmentAmount: number;

  @Column()
  periodMonths: number;

  @Column('decimal', { precision: 12, scale: 2 })
  monthlyReturn: number;

  @Column('decimal', { precision: 12, scale: 2 })
  totalAmount: number;
}
