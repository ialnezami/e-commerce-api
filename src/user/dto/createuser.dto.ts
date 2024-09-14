import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'The email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'The password for the user',
    example: 'strongPassword123',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'The first name of the user',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'The last name of the user',
    example: 'Doe',
    required: false,
  })
  lastName?: string;
}
