<<<<<<< HEAD
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

=======
import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../gallery.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  selectedFile: File | null = null;
  images: any[] = [];
  userId: number | null = null;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.Uid;

    if (this.userId) {
      this.loadGallery();
    } else {
      console.error('User not logged in or Uid missing');
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
      alert('Nie wybrano pliku lub użytkownik niezalogowany.');
    }
  }

  loadGallery(): void {
    if (this.userId !== null) {
      this.galleryService.getGallery(this.userId).subscribe((data) => {
        this.images = data;
      });
    }
  }
>>>>>>> 32c42e4e0bdd3e09d36f595666bcf50d477a7f2a
}
