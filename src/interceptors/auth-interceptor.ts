import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(API_CONFIG.baseUrl)) {
            const localUser = this.storageService.getLocalUser();

            if (localUser) {
                const authReq = req.clone({
                    headers: req.headers.set('Authorization',
                        'Bearer ' + localUser.token)
                });
                return next.handle(authReq);
            }
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
