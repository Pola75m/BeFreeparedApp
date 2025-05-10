import { Component, OnInit } from '@angular/core';
import { GalleryImage, GalleryService } from '../services/gallery.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  gallery: GalleryImage[] = [];
  userId: any;
  selectedFile: File | null = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.userId = user.Uid;
      this.loadGallery();
  } 

  loadGallery(): void {
    if (this.userId !== null) {
      this.galleryService.getGallery(this.userId).subscribe((data) => {
        this.gallery = data;
      });
    }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(event: Event): void {
    event.preventDefault();

    if (this.selectedFile && this.userId !== null) {
      this.galleryService.uploadImage(this.selectedFile, this.userId).subscribe(() => {
        this.loadGallery();
        this.selectedFile = null;
      });
    } else {
      alert('Nie wybrano pliku do dodania.');
    }
  }
  deleteImage(fileId: number): void {
    if (confirm("Czy na pewno chcesz usunąć ten plik?")) {
      this.galleryService.deleteImage(this.userId, fileId).subscribe({
        next: () => this.loadGallery(),
        error: (err) => console.error('Error: Nie udało się usunąć pliku', err)
      });
    }
  }
  handleClickAndUpload(event: Event): void {
  this.onFileSelected(event);
  this.uploadImage(new Event('submit'));
}
}
