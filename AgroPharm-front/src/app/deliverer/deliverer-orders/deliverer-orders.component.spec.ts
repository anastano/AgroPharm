import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererOrdersComponent } from './deliverer-orders.component';

describe('DelivererOrdersComponent', () => {
  let component: DelivererOrdersComponent;
  let fixture: ComponentFixture<DelivererOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DelivererOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
