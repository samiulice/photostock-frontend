import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContent } from './upload-content';

describe('UploadContent', () => {
  let component: UploadContent;
  let fixture: ComponentFixture<UploadContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
