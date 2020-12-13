import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillingInfoComponent } from './add-billing-info.component';

describe('AddBillingInfoComponent', () => {
  let component: AddBillingInfoComponent;
  let fixture: ComponentFixture<AddBillingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
