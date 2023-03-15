import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../../entities/album.entity';
import { getRandomSubset } from 'src/shared/utils/random.utils';
import { IGetAlbums } from '../../types/itunes-api.types';
import { artists } from './constants';
import { iTunesApi, loggerFiles } from '../../constants';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class ArtistService {
  constructor(
    private httpService: HttpService,
    private readonly logger: LoggerService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2PM)
  fetchAlbums() {
    artists.forEach(async (artist) => {
      const albums = await this.getAlbums(artist);
      const existing = (await Album.find({ where: { artist } })).map(
        (album) => album.name,
      );
      const newAlbums = albums.filter((album) => !existing.includes(album));

      if (newAlbums.length > 0) {
        await Album.createQueryBuilder()
          .insert()
          .into(Album)
          .values(newAlbums.map((album) => ({ artist, name: album })))
          .execute()
          .then(() => {
            this.logger.log(
              `New albums available for ${artist}: ${newAlbums.join(' | ')}`,
              loggerFiles.newAlbums,
            );
          });
      }
    });
  }

  async startGame() {
    const artist = getRandomSubset(artists, 1).at(0);
    let albums = await this.getStoredAlbums(artist);

    if (albums.length < 5) {
      albums = await this.getAlbums(artist);
    }

    return {
      artist,
      albums,
    };
  }

  async getStoredAlbums(artist: string) {
    const albums = (await Album.find({ where: { artist } })).map(
      (album) => album.name,
    );

    const randomAlbums = getRandomSubset(albums, 5);
    return randomAlbums;
  }

  async getAlbums(artist: string): Promise<string[]> {
    const url = `${iTunesApi}/search`;
    const params = {
      media: 'music',
      entity: 'album',
      attribute: 'artistTerm',
      term: artist,
    };

    const albums = await lastValueFrom(
      this.httpService.get<IGetAlbums>(url, { params }).pipe(
        map((response) => response.data.results),
        map((results) =>
          results.filter(
            (item) => item.artistName.toLowerCase() === artist.toLowerCase(),
          ),
        ),
        map((albums) => albums.map((album) => album.collectionName)),
      ),
    );

    const randomAlbums = getRandomSubset<string>(albums, 5);
    return randomAlbums;
  }
}
