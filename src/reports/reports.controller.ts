import { Controller, Post, Body, Param, Patch, UseGuards, Get, Query } from '@nestjs/common';
import { CreateReportDTO } from './dto/createReportDTO';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { reportDTO } from './dto/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDTO } from './dto/approve.dto';
import { GetEstimateDTO } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService){}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(reportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User){
    console.log("User para criar report:" , user)
    return this.reportsService.create(body, user);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDTO){
    console.log(query);
    return this.reportsService.createEstimate(query);
  };

  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO){
     return this.reportsService.changeApproval(id, body.approved)
  };


}
