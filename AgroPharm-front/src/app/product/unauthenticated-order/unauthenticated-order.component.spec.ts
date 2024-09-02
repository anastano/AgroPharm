import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedOrderComponent } from './unauthenticated-order.component';

describe('UnauthenticatedOrderComponent', () => {
  let component: UnauthenticatedOrderComponent;
  let fixture: ComponentFixture<UnauthenticatedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnauthenticatedOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthenticatedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
