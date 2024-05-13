import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

//@  - known as decorator

@Controller('users') //  /users
export class UsersController {
  /*
        GET    /users 
        GET    /users/:id 
        POST   /users 
        PATCH  /users/:id
        DELETE /users/:id
    */

  @Get() //GET /users   or  /users?role=value&gender=value
  findAll(@Query('role') role ?: `INTERN` | 'ENGINEER' | 'ADMIN' ) {
    return role ? [ role ] : [];
  }

  @Get('/interns') //Get /users/interns
  findAllInterns() {
    return [{},{}];
  }

  @Get(':id') //Get /users/:id
  findOne(@Param('id') id: string) {
    return { id };
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
 create( @Body() user : {} ){
    return user
 }

 @Patch(':id') //PATCH  /users/:id
 update( @Param( 'id' ) id : string , @Body() userUpdate : {}  ){
    return { id,...userUpdate }
 }

 @Delete(':id')  //DELETE /users/:id
 userDelete( @Param('id') id : string){
    return `user deleted sucessfully , ref : ${ id }`
 }

}
