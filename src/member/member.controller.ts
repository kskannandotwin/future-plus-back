import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMonthlyProfitDto } from './dto/create-monthly-profit.dto';
import { UpdateMonthlyProfitDto } from './dto/update-monthly-profit.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(+id);
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.memberService.remove(+id);
  }

  @Get(':id/profits')
  findProfits(@Param('id') id: string) {
    return this.memberService.findProfitsByMemberId(+id);
  }

  @Post(':id/profits')
  addProfit(@Param('id') id: string, @Body() dto: CreateMonthlyProfitDto) {
    return this.memberService.addProfitRecord(+id, dto);
  }

  @Patch('profits/:id')
  updateProfit(@Param('id') id: string, @Body() dto: UpdateMonthlyProfitDto) {
    return this.memberService.updateProfitRecord(+id, dto);
  }

  @Delete('profits/:id')
  removeProfit(@Param('id') id: string) {
    return this.memberService.removeProfitRecord(+id);
  }
}
