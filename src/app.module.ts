import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './modules/movie/movie.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [SharedModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
