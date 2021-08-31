import { StorageService } from './../services/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storageService: StorageService,
        public alertController: AlertController) {
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
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    default:
                        this.handleDefault(response);
                }

                return Observable.throw(response);
            }) as any;
    }

    handle401() {
        this.alertController.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK' }
            ]
        }).present();
    }

    handle403() {
        this.storageService.setLocalUser(null);
    }

    handleDefault(reponse: any) {
        this.alertController.create({
            title: `Erro ${reponse.status}: ${reponse.error}`,
            message: reponse.message,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK' }
            ]
        }).present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
