import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { User as UserPrisma } from '@prisma/client';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("tweets")
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) { }

  @Get()
  @ApiQuery({
    name: "page",
    "description": "page number for results",
    example: 1
  })
  async getTweets(@Query('page') page: number = undefined) {
    if (page && (isNaN(page) || page <= 0)) {
      throw new HttpException('Invalid page value', HttpStatus.BAD_REQUEST);
    }

    return this.tweetsService.getTweets(page);
  }

  @Get('/:username')
  @ApiParam({
    name: "username",
    description: "username",
    example: "didi.pinho"
  })
  async getTweetsFromUsername(@Param('username') username: string) {
    return await this.tweetsService.getTweetsFromUser(username);
  }

  @Post()
  @UseGuards(AuthGuard) // guardar que protegem a minha rota
  @ApiBearerAuth()
  async createTweet(@Body() tweetDTO: CreateTweetDto, @User() user: UserPrisma) {
    try {
      return await this.tweetsService.createTweet(user, tweetDTO.tweet);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
