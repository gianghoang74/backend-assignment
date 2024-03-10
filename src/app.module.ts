import { Module } from '@nestjs/common';
import { UrlModule } from './module/url/url.module';

@Module({
  imports: [UrlModule],
})
export class AppModule {}
