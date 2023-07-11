import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientsComponent } from './add-client.component';

describe('ClientsComponent', () => {
  let component: AddClientsComponent;
  let fixture: ComponentFixture<AddClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClientsComponent]
    });
    fixture = TestBed.createComponent(AddClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
