import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GalleryImage, GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-communitygallery',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './communitygallery.component.html',
  styleUrl: './communitygallery.component.css'
})
export class CommunitygalleryComponent {
  gallery: GalleryImage[] = [];
  searchUsername: string='';

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {this.loadGallery();
  }
  loadGallery(){
    this.galleryService.getCommunityGallery().subscribe({
      next: (images) => this.gallery = images,
      error: (err) => console.error('Error loading gallery:', err)
    });
  }
}
