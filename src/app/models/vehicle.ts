export class VehicleProperty {
    name:string = '';
    type:string = '';
}
export class VehiclaData{
    key: VehicleProperty = {name:'',type:''};
    data: string = '';
}
export class VehicleEntryDetails{
    name: string = '';
    values: VehiclaData[] = [];
}

export class Vehicle{
    name: string = '';
}