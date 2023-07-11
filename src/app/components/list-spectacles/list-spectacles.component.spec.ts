import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpectaclesComponent } from './list-spectacles.component';

describe('ListSpectaclesComponent', () => {
  let component: ListSpectaclesComponent;
  let fixture: ComponentFixture<ListSpectaclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSpectaclesComponent]
    });
    fixture = TestBed.createComponent(ListSpectaclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
