import { Injectable } from '@angular/core';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { RequestCacheService } from '../request-cache.service';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';

const TTL = 300; // 300 seconds til it expires

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req.url);
    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event, TTL);
        }
      })
    );
  }
}
