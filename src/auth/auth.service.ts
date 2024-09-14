import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service'; // Assuming there's a UserService that handles user data.
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { User } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService, // Assuming you have a UserService for managing users.
  ) {}

  /**
   * Hash password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compare passwords using bcrypt
   */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Generate JWT Token
   */
  async generateJwt(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  /**
   * Register a new user
   */
  async registration(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Check if the email is already in use
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    // Hash the password before saving the user
    const hashedPassword = await this.hashPassword(password);

    // Save the new user
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword, // Save the hashed password
    });

    return newUser;
  }

  /**
   * Login a user and return a JWT token
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Check if user exists
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Compare passwords
    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.generateJwt(payload);

    return { accessToken };
  }

  /**
   * Validate user by JWT
   */
  async validateUser(payload: any): Promise<User> {
    return this.userService.findByEmail(payload.email);
  }
}
