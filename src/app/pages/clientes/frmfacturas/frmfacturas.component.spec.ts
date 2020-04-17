import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmfacturasComponent } from './frmfacturas.component';

describe('FrmfacturasComponent', () => {
  let component: FrmfacturasComponent;
  let fixture: ComponentFixture<FrmfacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmfacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
