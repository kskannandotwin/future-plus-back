import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { MonthlyProfit } from './monthly-profit.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMonthlyProfitDto } from './dto/create-monthly-profit.dto';
import { UpdateMonthlyProfitDto } from './dto/update-monthly-profit.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(MonthlyProfit)
    private readonly profitRepository: Repository<MonthlyProfit>,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.memberRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    return this.memberRepository.save(member);
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.findOne(id);
    Object.assign(member, updateMemberDto);
    return this.memberRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.memberRepository.remove(member);
  }

  async findProfitsByMemberId(memberId: number): Promise<MonthlyProfit[]> {
    return this.profitRepository.find({
      where: { memberId },
      order: { id: 'DESC' },
    });
  }

  async addProfitRecord(memberId: number, dto: CreateMonthlyProfitDto): Promise<MonthlyProfit> {
    const member = await this.findOne(memberId);
    const netTotal = Number(dto.profit) - Number(dto.loss) - Number(dto.brokerCharge || 0);
    const profitRecord = this.profitRepository.create({
      ...dto,
      netTotal,
      member,
    });
    return this.profitRepository.save(profitRecord);
  }

  async updateProfitRecord(id: number, dto: UpdateMonthlyProfitDto): Promise<MonthlyProfit> {
    const record = await this.profitRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Profit record with ID ${id} not found`);
    }
    
    Object.assign(record, dto);
    
    // Recalculate netTotal if profit, loss, or brokerCharge changed
    if (dto.profit !== undefined || dto.loss !== undefined || dto.brokerCharge !== undefined) {
      record.netTotal = Number(record.profit) - Number(record.loss) - Number(record.brokerCharge || 0);
    }
    
    return this.profitRepository.save(record);
  }

  async removeProfitRecord(id: number): Promise<void> {
    const record = await this.profitRepository.findOne({ where: { id } });
    if (!record) {
      throw new NotFoundException(`Profit record with ID ${id} not found`);
    }
    await this.profitRepository.remove(record);
  }
}
