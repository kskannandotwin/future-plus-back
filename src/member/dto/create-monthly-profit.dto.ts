import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMonthlyProfitDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  profit: number;

  @IsNotEmpty()
  @IsNumber()
  loss: number;
}
