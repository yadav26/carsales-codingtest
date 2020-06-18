import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleEntryComponent } from './add-vehicle-entry.component';

describe('AddVehicleEntryComponent', () => {
  let component: AddVehicleEntryComponent;
  let fixture: ComponentFixture<AddVehicleEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicleEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
