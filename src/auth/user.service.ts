import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }
}
