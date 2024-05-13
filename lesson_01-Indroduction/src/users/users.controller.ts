import { Controller, Get, Param } from '@nestjs/common';

@Controller('users') //users route handling eg : /user/profile
export class UsersController {
    /*
               GET  /users
               GET  /users/:id
               POST  /users
               PATCH /users/:id
    */
   //GET /users
   @Get()
   findAll(){
        return []
   }

   //GET /users/:id
   @Get(':id')
   findOne(@Param('id') id : string ){
    return { id }
   }
}
