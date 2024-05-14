import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service'; // importing the service for injection to the controller
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto  } from './dto/update-user.dto';


/* 
  NOTE : In last lesson we used unary operator to convert params id in string format to the number ,in those case 
  we dont get validation error because in route if we pass => /users/aaaa or /users/1 will work as same . not  
  validating like its numeric string or alphabetics , but there is some built in pipes of nestjs , we are using 
  ParseIntPipe for parsing params id  , then if it is not numeric string it will throgh an error of validation . 
  it only accepts numeric string as for the field of id 
  Eg :- 

  #1 , DTO - data transfer object 
  #2 , DTO folder created inside the users directory and exporting dtos
  #3 , PartialType() => it means when we are creating dto's all fields are required , we need those required option on the time of
       CREATE  , but in the UPDATE  its is not necossory , on that time we can extends PartialType() utility function .

  #4 , import { PartialType } from  "@nestjs/mapped-types"
       we need to install mapped types => npm i @nestjs/mapped-types -D

  #5 , class-validator and class-transformer     added in dto folder 
  #6 , ParseIntPipe
  #7 , ValidationPipe
*/


@Controller('users') //  /users
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


  @Get() //GET /users   or  /users?role=value&gender=value
  findAll(@Query('role') role?: `INTERN` | 'ENGINEER' | 'ADMIN') {
    /* Adding the methods from userService to the controller */
    return this.usersService.findAll(role);
  }

  @Get(':id') //Get /users/:id  ::::: adding pipe to the controller => ParseIntPipe
  findOne(@Param('id' , ParseIntPipe ) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() //POST  /users ::: added Validation pipe 
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto ,
  ) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') //PATCH  /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') //DELETE /users/:id
  userDelete(@Param('id' , ParseIntPipe) id: number) {
    return this.usersService.userDelete(id);
  }
}
