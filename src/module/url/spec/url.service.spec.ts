import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from '../url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 3 items with sorted order', async () => {
    const urls = await service.getReachableUrls();
    expect(urls.length).toBe(3);
  });

  it('should return 1 item with matching priority', async () => {
    const urls = await service.getReachableUrls(3);
    expect(urls.length).toBe(1);
  });
});
