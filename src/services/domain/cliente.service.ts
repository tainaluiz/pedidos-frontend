import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient) {
    }

    findByEmail(email: string): Observable<ClienteDTO> {
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = this.getFormattedUrlImageFromBucket(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getFormattedUrlImageFromBucket(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    }
}