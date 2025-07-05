import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWrapper } from './image-wrapper';

describe('ImageWrapper', () => {
  let component: ImageWrapper;
  let fixture: ComponentFixture<ImageWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
