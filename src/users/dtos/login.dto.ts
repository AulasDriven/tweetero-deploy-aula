import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword, IsUrl } from 'class-validator';

export default class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "didi",
    description: "username for user"
  })
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    example: "s3nh@f0rt3!",
    description: "password for user"
  })
  password: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    example: "https://placeholder.com/150x150",
    description: "profile image for user"
  })
  avatar: string;
}
