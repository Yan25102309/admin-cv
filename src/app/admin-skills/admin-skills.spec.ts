import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkills } from './admin-skills';

describe('AdminSkills', () => {
  let component: AdminSkills;
  let fixture: ComponentFixture<AdminSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSkills],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSkills);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
