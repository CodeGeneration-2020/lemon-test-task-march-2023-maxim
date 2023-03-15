import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LoggerService } from '../../logger';
import { User } from '../../entities/user.entity';
import { SubmitScoreDTO } from './dto';
import { loggerFiles } from '../../constants';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}

  async submitScore(body: SubmitScoreDTO) {
    const user = await User.findOne({ where: { username: body.username } });

    if (user && body.result) {
      user.score += 5;
      await user.save();
    } else if (!user) {
      const newUser = new User();
      newUser.username = body.username;
      newUser.score = body.result ? 5 : 0;
      await newUser.save();
    }

    return this.getTopUsers(3);
  }

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  async logTopUser() {
    const users = await this.getTopUsers(3);
    this.logger.log(
      `Top users: ${users
        .map((user) => `${user.username} - ${user.score}`)
        .join(', ')}`,
      loggerFiles.topUsers,
    );
  }

  async getTopUsers(take: number) {
    const users = await User.find({
      order: {
        score: 'DESC',
      },
      take,
    });

    return users;
  }
}
