import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  uploadImage(file: File, userId: number): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', userId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getGallery(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/gallery/${userId}`);
  }
}
