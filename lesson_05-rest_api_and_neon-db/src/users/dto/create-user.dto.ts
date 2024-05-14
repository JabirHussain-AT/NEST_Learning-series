    import { IsEmail , IsEnum  , IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";


    export class CreateUserDto {
        @IsString()
        @IsNotEmpty()
        @Matches(/^[a-zA-Z\s]+$/, {
            message: "Name must contain only letters and spaces"
        })
        name : string ;

        @IsNumber()
        age : number ;

        @IsString()
        @IsNotEmpty()
        address : string ;

        @IsEmail()
        email : string ;

        //enum validator 
        @IsEnum([ 'INTERN' , 'ENGINEER' , 'ADMIN'] ,{
            message : "Valid role required "
        })
        role : 'INTERN' | 'ENGINEER' | 'ADMIN' ;
    }
