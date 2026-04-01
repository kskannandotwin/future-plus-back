import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { Member } from './member.entity';
import { MonthlyProfit } from './monthly-profit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, MonthlyProfit])],
  providers: [MemberService],
  controllers: [MemberController],
  exports: [MemberService],
})
export class MemberModule {}
