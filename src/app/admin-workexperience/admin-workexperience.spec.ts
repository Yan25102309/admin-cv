import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkexperience } from './admin-workexperience';

describe('AdminWorkexperience', () => {
  let component: AdminWorkexperience;
  let fixture: ComponentFixture<AdminWorkexperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWorkexperience],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminWorkexperience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
