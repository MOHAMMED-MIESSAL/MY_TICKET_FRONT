import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestAuthComponent } from './admin-test-auth.component';

describe('AdminTestAuthComponent', () => {
  let component: AdminTestAuthComponent;
  let fixture: ComponentFixture<AdminTestAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTestAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTestAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
