import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitygalleryComponent } from './communitygallery.component';

describe('CommunitygalleryComponent', () => {
  let component: CommunitygalleryComponent;
  let fixture: ComponentFixture<CommunitygalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunitygalleryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunitygalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
