import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './user.service';
import { CreateUserDto } from '../user/dto/createuser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService, // Inject UsersService for interacting with user data
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  // User signup logic
  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { email, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash the password and create the user
    const hashedPassword = await this.hashPassword(password);
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Generate JWT token for the newly created user
    const token = await this.generateJwt({
      userId: user.id,
      email: user.email,
    });

    return { user, token };
  }

  // User login logic
  async signin(email: string, password: string): Promise<any> {
    // Find the user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the password
    const passwordMatches = await this.comparePasswords(
      password,
      user.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token upon successful login
    const token = await this.generateJwt({
      userId: user.id,
      email: user.email,
    });

    return { user, token };
  }
}
