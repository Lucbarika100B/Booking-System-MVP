import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpectacleComponent } from './add-spectacle.component';

describe('AddSpectacleComponent', () => {
  let component: AddSpectacleComponent;
  let fixture: ComponentFixture<AddSpectacleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpectacleComponent]
    });
    fixture = TestBed.createComponent(AddSpectacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
