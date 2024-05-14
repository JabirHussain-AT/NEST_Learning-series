import { CreateUserDto  } from "./create-user.dto";
import { PartialType } from  "@nestjs/mapped-types"
// we need to install mapped types => npm i @nestjs/mapped-types -D


export class UpdateUserDto extends PartialType(CreateUserDto){}

// Exporting the UpdatedUserDto