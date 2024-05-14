import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service'; // importing the service for injection to the controller

// #1 :  '@'  - known as decorator

@Controller('users') //  /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
        GET    /users 
        GET    /users/:id 
        POST   /users 
        PATCH  /users/:id
        DELETE /users/:id
    */

  @Get() //GET /users   or  /users?role=value&gender=value
  findAll(@Query('role') role?: `INTERN` | 'ENGINEER' | 'ADMIN') {
    /* Adding the methods from userService to the controller */
    return this.usersService.findAll(role);
  }

  /* @Get('/interns') //Get /users/interns
     findAllInterns() {
      return [{},{}];
  }*/

  @Get(':id') //Get /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  /* ------------------------------------------------------------------------------------------------------------------
  IF IT IS WE ARE GIVING ROUTES AFTER  A ENDPOINT WHICH TAKES PARAMS THE ENDPOINT ROUTES SIMILAR
  TO THE GIVEN ROUTE WILL NOT WORK , IT TAKES THE FIRST ROUTE
  FOR EG : /users/:id will work too on /users/interns
  make it above the param routes


    @Get('/interns')  //Get /users/interns
    findAllInterns(){
      return [{}]
    }
 */

  @Post() //POST  /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      age: number;
      address: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') //PATCH  /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: {
      name: string;
      email: string;
      age: number;
      address: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') //DELETE /users/:id
  userDelete(@Param('id') id: string) {
    return this.usersService.userDelete(+id);
  }
}
