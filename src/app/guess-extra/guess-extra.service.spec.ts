import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessExtraService } from './guess-extra.service';

describe('GuessExtraComponent', () => {
  let component: GuessExtraService;
  let fixture: ComponentFixture<GuessExtraService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessExtraService]
    });
    fixture = TestBed.createComponent(GuessExtraService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
