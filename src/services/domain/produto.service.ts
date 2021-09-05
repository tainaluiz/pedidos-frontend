import { ProdutoDTO } from './../../models/produto.dto';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produto_id: string) {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

    findByCategoria(categoria_id: string, page: number = 0, linesPerPage: number = 24): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&size=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = this.getFormattedUrlSmallImageFromBucket(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = this.getFormattedUrlImageFromBucket(id);
        return this.http.get(url, { responseType: 'blob' });
    }

    getFormattedUrlSmallImageFromBucket(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    }

    getFormattedUrlImageFromBucket(id: string) {
        return `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    }
}