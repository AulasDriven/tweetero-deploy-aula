import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  // cadastro
  @Post("/sign-up")
  @ApiOperation({ summary: "Register a user." })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Username already in use."
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Everything went just fine"
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // login
  @Post("/sign-in")
  @ApiOperation({ summary: "Authenticate a user." })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

}
