import { Controller, Body } from '@nestjs/common';
import { ApiPost } from '../common/decorators/docs.decorator';
import { SubmitScoreDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiPost('submit', 'Submit user result', 'result')
  async submitScore(@Body() body: SubmitScoreDTO) {
    return this.userService.submitScore(body);
  }
}
