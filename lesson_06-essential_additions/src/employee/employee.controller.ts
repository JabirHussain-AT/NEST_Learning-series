import { Controller, Get, Post, Body, Patch, Param, Delete , 
  Query
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Prisma  } from '@prisma/client';
import { Throttle , SkipThrottle } from '@nestjs/throttler';

//skip throttler for this controller 
//@SkipThrottle({default : false})

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput ) {
    return this.employeeService.create(createEmployeeDto);
  }

  //skip throttler for this route 
//@SkipThrottle({default : false})
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.employeeService.findAll(role);
  }

  //setting throttle for this special route 
  @Throttle({short : {ttl : 1000 , limit : 1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
