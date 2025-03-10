import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusUserComponent } from './update-status-user.component';

describe('UpdateStatusUserComponent', () => {
  let component: UpdateStatusUserComponent;
  let fixture: ComponentFixture<UpdateStatusUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateStatusUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStatusUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
