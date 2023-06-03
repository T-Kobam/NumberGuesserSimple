import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessExtraComponent } from './guess-extra.component';

describe('GuessExtraComponent', () => {
  let component: GuessExtraComponent;
  let fixture: ComponentFixture<GuessExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessExtraComponent]
    });
    fixture = TestBed.createComponent(GuessExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
