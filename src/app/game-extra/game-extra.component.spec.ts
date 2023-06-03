import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExtraComponent } from './game-extra.component';

describe('GameExtraComponent', () => {
  let component: GameExtraComponent;
  let fixture: ComponentFixture<GameExtraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameExtraComponent]
    });
    fixture = TestBed.createComponent(GameExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
