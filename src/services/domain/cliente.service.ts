import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from './../../config/api.config';
import { ImageUtilService } from './../image-util.service';

@Injectable()
export class ClienteService {

    constructor(
        public http: HttpClient,
        public imageUtilService: ImageUtilService) {
    }

    findById(id: string): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

    findByEmail(email: string): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = this.getFormattedUrlImageFromBucket(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getFormattedUrlImageFromBucket(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    }

    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }

    uploadPicture(picture: string) {
        const pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        const formData: FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseUrl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}