import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormproductosComponent } from './formproductos.component';

describe('FormproductosComponent', () => {
  let component: FormproductosComponent;
  let fixture: ComponentFixture<FormproductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormproductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormproductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
