import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryClientComponent } from './registry-client.component';

describe('RegistryClientComponent', () => {
  let component: RegistryClientComponent;
  let fixture: ComponentFixture<RegistryClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
