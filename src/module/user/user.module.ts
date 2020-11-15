import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserRepository],
})
export class UserModule {}
