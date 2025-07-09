import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetails } from './image-details';

describe('ImageDetails', () => {
  let component: ImageDetails;
  let fixture: ComponentFixture<ImageDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
