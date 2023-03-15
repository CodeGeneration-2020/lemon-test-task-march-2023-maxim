import { Controller } from '@nestjs/common';
import { ApiGet } from '../common/decorators/docs.decorator';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiGet('start', 'Start game', 'game')
  async startGame() {
    return this.artistService.startGame();
  }
}
