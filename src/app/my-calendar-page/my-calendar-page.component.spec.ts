import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalendarPageComponent } from './my-calendar-page.component';

describe('MyCalendarPageComponent', () => {
  let component: MyCalendarPageComponent;
  let fixture: ComponentFixture<MyCalendarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCalendarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCalendarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
