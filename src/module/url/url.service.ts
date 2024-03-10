import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { compact } from 'lodash';
import { lastValueFrom } from 'rxjs';
const urls = [
  {
    url: 'https://does-not-work.perfume.new',
    priority: 1,
  },
  {
    url: 'https://gitlab.com',
    priority: 4,
  },
  {
    url: 'https://github.com',
    priority: 4,
  },
  {
    url: 'https://doesnt-work.github.com',
    priority: 4,
  },
  {
    url: 'http://app.scnt.me',
    priority: 3,
  },
  {
    url: 'https://offline.scentronix.com',
    priority: 2,
  },
];

@Injectable()
export class UrlService {
  constructor(private httpService: HttpService) {}

  async getReachableUrls(priority?: number) {
    const filteredUrls = priority
      ? urls
          .filter((url) => url.priority === priority)
          .sort((a, b) => a.priority - b.priority)
      : urls.sort((a, b) => a.priority - b.priority);
    return compact(
      await Promise.all(
        filteredUrls.map(async (url) => await this.verifyUrl(url.url)),
      ),
    );
  }

  private async verifyUrl(url: string) {
    try {
      const res = await lastValueFrom(
        this.httpService.get(url, {
          timeout: 5000,
        }),
      );
      if (res.status >= 200 || res.status <= 299) {
        return url;
      }
    } catch (error) {
      return;
    }
  }
}
