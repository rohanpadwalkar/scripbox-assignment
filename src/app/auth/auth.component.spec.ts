import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [AppRoutingModule, FormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call reset function', () => {
    spyOn(component, 'reset');
    let btn = fixture.debugElement.query(By.css('.reset-btn'));
    btn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.reset).toHaveBeenCalled();
  })

  it('should reset data', () => {
    spyOn(window, "confirm");
    component.reset();
    fixture.detectChanges();
    expect(window.confirm).toHaveBeenCalled();
  })
});
