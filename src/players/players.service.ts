import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayerProps } from './interfaces/player.interface';
@Injectable()
export class PlayersService {
  private players: PlayerProps[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const playerFound = await this.players.find(
      (player) => player.email === email,
    );

    if (playerFound) {
      this.update(playerFound, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async consultAllPlayers(): Promise<PlayerProps[]> {
    return await this.players;
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, phoneNumber, email } = createPlayerDto;

    const player: PlayerProps = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ramking: 'A',
      positionRanking: 1,
      urlPhotoPlayer: 'https://avatars.githubusercontent.com/u/15049865?v=4',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(createPlayerDto)}`);
    this.players.push(player);
  }
  private update(
    playerFound: PlayerProps,
    createPlayerDto: CreatePlayerDto,
  ): void {
    const { name } = createPlayerDto;
    playerFound.name = name;
  }
}
