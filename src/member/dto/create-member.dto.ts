import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1000, { message: 'Investment amount must be at least 1000 INR' })
  investmentAmount: number;

  @IsNumber()
  @Min(1)
  periodMonths: number;

  @IsNumber()
  monthlyReturn: number;

  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  joinedDate: string;
}
