import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { GalleryImage, GalleryService } from '../services/gallery.service';

@Component({
  selector: 'app-communitygallery',
  imports: [NgFor],
  templateUrl: './communitygallery.component.html',
  styleUrl: './communitygallery.component.css'
})
export class CommunitygalleryComponent {
  gallery: GalleryImage[] = [];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.getCommunityGallery().subscribe({
      next: (images) => this.gallery = images,
      error: (err) => console.error('Error loading gallery:', err)
    });
  }
}
