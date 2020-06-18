import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AddVehicleEntryComponent } from '../add-vehicle-entry/add-vehicle-entry.component';
import { VehicleEntryDetails } from '../../models/vehicle';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { VehicleRemove } from '../../vehicle.actions';
@Component({
  selector: 'app-add-vehicle-type',
  templateUrl: './add-vehicle-type.component.html',
  styleUrls: ['./add-vehicle-type.component.css']
})
export class AddVehicleTypeComponent implements OnInit {
  @Output() messageEvent = new EventEmitter();
  @ViewChild(AddVehicleEntryComponent) addEntry: AddVehicleEntryComponent;

  private msgSubscription: Subscription;
  private childEventSubcription;

  showMessageNotification = true;
  enableTypeEdit=true;
  showNewVehicleForm = false;
  vehicleName = '';
  propname = '';
  proptype = '';
  vehicleMap = {};
  vehicleEntryDetails: Observable<VehicleEntryDetails[]>;
  message: string;
  commonProperties = [{name :'make', type: 'string'},{name :'model', type: 'string'}];
  //inject store to save entries 
  //register notification event for broadcasted message 
  constructor(private store: Store<{ vehicleEntryDetails: VehicleEntryDetails[] }>) {
    this.vehicleEntryDetails = store.select(state =>state.vehicleEntryDetails);
    this.msgSubscription = this.messageEvent.subscribe({
      next: async (msg) => {
        this.message = msg;
      }
    });
  }  
  //Message notification popup
  close() {
    this.showMessageNotification = false;
    setTimeout(() => this.showMessageNotification = true, 5000);
  }
  ngOnInit(): void { }
  ngOnDestroy() {
    this.msgSubscription.unsubscribe();
    this.childEventSubcription.unsubscribe();
  }
  //Alter/update common properties
  updateCommonProperties(name ,type){
    this.commonProperties.push({name:name, type:type});
  }
  //Use common property array to fill in
  addCommonVehicleProperty()
  {
    this.vehicleMap[this.vehicleName] = [];
    for(let prop of this.commonProperties)
      this.vehicleMap[this.vehicleName].push(prop);
  }
  //Dynamically add properties of vehicle type
  //duplicates not permitted
  addVehicleProperty()
  {
    let val = this.vehicleMap[this.vehicleName.toLowerCase()];
    if(null == val.find( e => e.name == this.propname.toLowerCase())){
      val.push({name :this.propname.toLowerCase(), type: this.proptype.toLowerCase()});
      this.messageEvent.emit(`Success adding ${this.vehicleName}.${this.propname}|${this.proptype} property.`);
    }else{
      this.messageEvent.emit(`Failed to add ${this.vehicleName}.${this.propname} :Property alreay exists`);
    }
  }
  //Create / update vehcile type properties
  createVehicle(name){
    this.vehicleName = name;
    //child entry will only be loaded here
    //fill in the map for entries
    this.childEventSubcription = this.addEntry.eventEntryMessage.subscribe({
      next: async (msg) => {
        this.message = msg;
      }
    });
    
    if(this.vehicleMap[this.vehicleName.toLowerCase()] == undefined){ //if new vehicle type
      this.addCommonVehicleProperty();
      if(this.propname !== '' && this.proptype !== '')
      {
        this.addVehicleProperty();
      }
      this.messageEvent.emit(`Success creating vehicle type ${this.vehicleName} with default properties.`);
      this.showNewVehicleForm = false;
    }else{//if vehicle already exists, altering the vehicle details
      if(this.propname !== '' && this.proptype !== '')
        this.addVehicleProperty();
      else
        this.messageEvent.emit(`Error vehicle ${this.vehicleName} already exists with default properties.`);
      
      this.showNewVehicleForm = false;
    }
    this.vehicleName = '';
    this.propname = '';
    this.proptype = '';
  }

  //This is additional - display usage of the vehicle types can be creaed and deleted on runtime
  createEntry(name){
    if(name=='new'){
      this.showNewVehicleForm = true;
      return;
    }
    this.addEntry.requestVehicleType = name;
    this.addEntry.aliases.clear();
    this.vehicleMap[name].forEach( val =>{
       this.addEntry.addAlias(val.name, val.type);
    });
    let arr = this.vehicleMap[name];
  }
  removeVehicle(vehicleIndex) {
    this.store.dispatch(new VehicleRemove(vehicleIndex));
    this.messageEvent.emit('Entry removed successfully');
  }
}
