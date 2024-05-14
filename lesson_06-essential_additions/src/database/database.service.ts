import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
    async  onModuleInit() {
        await this.$connect().then(()=> console.log('Connected db successfully ')).catch(()=>console.log('error in connecting db !'))
    }
}
