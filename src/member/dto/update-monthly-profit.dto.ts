import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthlyProfitDto } from './create-monthly-profit.dto';

export class UpdateMonthlyProfitDto extends PartialType(CreateMonthlyProfitDto) {}
