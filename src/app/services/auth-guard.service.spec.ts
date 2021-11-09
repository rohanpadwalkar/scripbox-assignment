import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AuthGuardService } from './auth-guard.service';
import { StorageService } from './storage.service';


describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StorageService], imports: [AppRoutingModule] });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
