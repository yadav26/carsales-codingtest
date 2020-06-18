import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store'; 
import { VehicleReducer } from './vehicle.reducer';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddVehicleEntryComponent } from './component/add-vehicle-entry/add-vehicle-entry.component';
import { AddVehicleTypeComponent } from './component/add-vehicle-type/add-vehicle-type.component';

@NgModule({
  declarations: [
    AppComponent,
    AddVehicleEntryComponent,
    AddVehicleTypeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ vehicleEntryDetails: VehicleReducer }),
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
