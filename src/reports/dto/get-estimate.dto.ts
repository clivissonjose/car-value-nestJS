import { 
  IsString,IsNumber, Min, Max, 
  IsLongitude, IsLatitude } 
from "class-validator";
import { Transform } from "class-transformer";

export class GetEstimateDTO{

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Max(2050)
  @Min(1930)
  year: number;


  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;


  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;


  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

}