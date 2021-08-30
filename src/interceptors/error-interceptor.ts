import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storageService: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((response) => {
                if (response.error) {
                    response = response.error;
                }
                if (!response.status) {
                    response = JSON.parse(response);
                }

                console.log(response);

                switch (response.status) {
                    case 403:
                        this.handle403();
                        break;
                }

                return Observable.throw(response);
            }) as any;
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
