import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';
import { API_CONFIG } from './../config/api.config';
import { LocalUser } from './../models/local_user';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storageService: StorageService) {
    }

    authenticate(creds: CredenciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`,
            creds, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfulLogin(authorizationValue: string) {
        const token = authorizationValue.substring(7);
        const email = this.jwtHelper.decodeToken(token).sub;

        const user: LocalUser = {
            token,
            email
        };
        this.storageService.setLocalUser(user);
    }

    logout() {
        this.storageService.setLocalUser(null);
    }
}