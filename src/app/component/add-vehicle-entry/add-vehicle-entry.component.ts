import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { VehicleEntryDetails } from '../../models/vehicle';
import { Store } from '@ngrx/store';
import { VehicleAdd } from '../../vehicle.actions';


/*
THIS IS TESTING CONTAINER - Proof of the vehicle types created
This is usage and facilitation of the entries in ngrx store
*/
@Component({
  selector: 'app-add-vehicle-entry',
  templateUrl: './add-vehicle-entry.component.html',
  styleUrls: ['./add-vehicle-entry.component.css']
})
export class AddVehicleEntryComponent implements OnInit {
  @Input() requestVehicleType: string; //carry the type information for the entry
  @Output() eventEntryMessage = new EventEmitter(); //event to broadcast messages
  vehicleEntryDetails: Observable<VehicleEntryDetails[]>;
  showVehicleEntryForm = false; //show and hide the entry controller

  entryForm = new FormGroup({  aliases: this.fb.array([]) });
  constructor(private fb: FormBuilder,
              private store: Store<{ vehicleEntryDetails: VehicleEntryDetails[] }>) {
    this.vehicleEntryDetails =  store.select(state=> state.vehicleEntryDetails);
  }
  ngOnInit() { }

  get aliases() {
    return this.entryForm.get('aliases') as FormArray;
  }
  addAlias(name , type ) {
    const newControl = this.fb.group({ name: name, type: type, data: '' });
    this.aliases.push(newControl);
  }
  addEntry() {
    const arr = this.aliases;
    this.showVehicleEntryForm = false;
    const vehicle = new VehicleEntryDetails(); 
    vehicle.name = this.requestVehicleType;
    for(var i =0; i<arr.length; ++i){
      let item = arr.at(i).value;
      let property  = { name: item.name, type: item.type };
      let vdata = {key: property, data: item.data};
      vehicle.values.push(vdata);
    }
    this.store.dispatch(new VehicleAdd(vehicle)); 
    this.eventEntryMessage.emit(`Success entry dispacted ${vehicle.name}`)
    this.aliases.clear();
  }
}
