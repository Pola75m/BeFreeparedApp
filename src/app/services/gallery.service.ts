import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GalleryImage {
  id: number;
  userId: number;
  fileName: string;
  url: string;
  uploaded_at: Date;
  username: string;
}
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
  getGallery(userId: number): Observable<GalleryImage[]> {
      return this.http.get<GalleryImage[]>(`${this.baseUrl}/gallery/${userId}`);
    }
  deleteImage(userId: number, fileId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/gallery/${userId}/${fileId}`);
  }
  getCommunityGallery():Observable<GalleryImage[]>{
    return this.http.get<GalleryImage[]>(`${this.baseUrl}/gallery`);
  }
}
