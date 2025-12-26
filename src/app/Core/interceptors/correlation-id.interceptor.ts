import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const correlationId = uuidv4();
        const cloned = req.clone({
            setHeaders: {
                'X-Correlation-ID': correlationId
            }
        });
        return next.handle(cloned);
    }
}
