import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateUserDto  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  /* creating an private data to work instead of creating database */

  private users = [
    {
      id: 1,
      name: 'John Doe',
      age: 28,
      email: 'john.doe@example.com',
      address: '123 Main Street, Cityville, USA',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 35,
      email: 'jane.smith@example.com',
      address: '456 Elm Street, Townsville, USA',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      age: 40,
      email: 'michael.johnson@example.com',
      address: '789 Oak Street, Villagetown, USA',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Emily Brown',
      age: 25,
      email: 'emily.brown@example.com',
      address: '101 Pine Street, Hamletville, USA',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'David Wilson',
      age: 32,
      email: 'david.wilson@example.com',
      address: '222 Cedar Street, Riverside, USA',
      role: 'INTERN',
    },
  ];

  /* Defining methods we mentioned in the controller */

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roles =  this.users.filter((user) => user.role === role);
      if( roles.length < 1){
        throw new NotFoundException('No matching users with this role ! , User Role Not Found !')
      }
      return roles
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if( !user ) throw new NotFoundException( " User Not Found !")
    return user ;
  }

  create(createUserDto: CreateUserDto ) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto, // UpdateUserDto validation added ****
  ) {
    // finding the user which we want to update and using map modifing and returining

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    //finding the updated user and returning the user
    return this.findOne(id);
  }

  userDelete(id: number) {
    //finding the user we want to  delete using filter and returining the removed user

    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
