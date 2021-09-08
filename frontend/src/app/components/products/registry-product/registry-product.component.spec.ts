import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryProductComponent } from './registry-product.component';

describe('RegistryProductComponent', () => {
  let component: RegistryProductComponent;
  let fixture: ComponentFixture<RegistryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
