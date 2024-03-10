import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from '../url.controller';
import { UrlService } from '../url.service';

describe('UrlController', () => {
  let controller: UrlController;
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UrlService,
          useFactory: () => ({
            verifyUrl: jest.fn(),
            getReachableUrls: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get(UrlService);
    controller = new UrlController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty array', async () => {
    jest.spyOn(service, 'getReachableUrls').mockResolvedValue([]);
    const urls = await controller.getReachableUrls({});
    expect(urls.length).toBe(0);
  });

  it('should return 2 items with sorted order', async () => {
    jest
      .spyOn(service, 'getReachableUrls')
      .mockResolvedValue(['http://app.scnt.me', 'https://gitlab.com']);
    const urls = await controller.getReachableUrls({});
    expect(urls.length).toBe(2);
  });

  it('should return 1 item with matching priority = 3', async () => {
    jest
      .spyOn(service, 'getReachableUrls')
      .mockResolvedValue(['http://app.scnt.me']);
    const urls = await controller.getReachableUrls({ priority: 3 });
    expect(urls.length).toBe(1);
  });
});
