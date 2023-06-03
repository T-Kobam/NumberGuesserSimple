import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExtraAiComponent } from './game-extra-ai.component';

describe('GameExtraAiComponent', () => {
  let component: GameExtraAiComponent;
  let fixture: ComponentFixture<GameExtraAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameExtraAiComponent]
    });
    fixture = TestBed.createComponent(GameExtraAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
