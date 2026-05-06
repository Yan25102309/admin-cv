import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLanguages } from './admin-languages';

describe('AdminLanguages', () => {
  let component: AdminLanguages;
  let fixture: ComponentFixture<AdminLanguages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLanguages],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLanguages);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
