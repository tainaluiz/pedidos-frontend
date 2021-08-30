import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './../storage.service';
import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public storageService: StorageService) {
    }

    findByEmail(email: string): Observable<ClienteDTO> {
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            { 'headers': authHeader });
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = this.getFormattedUrlImageFromBucket(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getFormattedUrlImageFromBucket(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    }
}