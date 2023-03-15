import { GameService } from '../services/game.service';

export class GameController {
  readonly gameService: GameService = new GameService()

  round = 0;
  artist = '';
  albums = [];

  public async startGame() {
    const data = await this.gameService.startGame();
    this.artist = data.artist;
    this.albums = data.albums;
    this.round = 1;
  }

  public checkAnswer(value: string) {
    if (value.toLowerCase().trim() === this.artist.toLowerCase().trim()) {
      return {
        win: true,
        round: this.round,
      };
    }

    this.round += 1;

    return {
      win: false,
      round: this.round,
    };
  }

  public reset() {
    this.round = 0;
    this.artist = '';
    this.albums = [];
  }

  public async submitResult(username: string, isWin: boolean) {
    const users = await this.gameService.submitResult(username, isWin);
    return users;
  }
}
