import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayerProps } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playrsService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    await this.playrsService.createUpdatePlayer(createPlayerDto);
  }

  @Get()
  async consultAllPlayers(): Promise<PlayerProps[]> {
    return this.playrsService.consultAllPlayers();
  }
}
