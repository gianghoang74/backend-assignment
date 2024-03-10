import { Controller, Get, Query } from '@nestjs/common';
import { QueryPriorityURLDto } from './dto/url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}
  @Get('/')
  async getReachableUrls(@Query() query: QueryPriorityURLDto) {
    return this.urlService.getReachableUrls(query.priority);
  }
}
