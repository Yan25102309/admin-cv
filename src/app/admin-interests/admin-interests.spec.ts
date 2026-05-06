import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInterests } from './admin-interests';

describe('AdminInterests', () => {
  let component: AdminInterests;
  let fixture: ComponentFixture<AdminInterests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminInterests],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInterests);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
