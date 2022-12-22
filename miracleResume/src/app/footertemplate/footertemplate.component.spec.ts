import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootertemplateComponent } from './footertemplate.component';

describe('FootertemplateComponent', () => {
  let component: FootertemplateComponent;
  let fixture: ComponentFixture<FootertemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootertemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootertemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
