import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputpdfComponent } from './outputpdf.component';

describe('OutputpdfComponent', () => {
  let component: OutputpdfComponent;
  let fixture: ComponentFixture<OutputpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
