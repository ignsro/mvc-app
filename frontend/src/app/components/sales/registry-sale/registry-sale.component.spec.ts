import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrySaleComponent } from './registry-sale.component';

describe('RegistrySaleComponent', () => {
  let component: RegistrySaleComponent;
  let fixture: ComponentFixture<RegistrySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrySaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
