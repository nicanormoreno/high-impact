interface geoLocation {
    creationDate: Date;
    id: number;
    lat: number;
    lng: number;
}

interface address {
    city: string;
    creationDate: Date;
    geoLocation: geoLocation
    housenumber:number;
    id:number;
    postalcode:string;
    street:string;
}

export interface AtmModel {
    address: address;
    creationDate: Date;
    id: number;
    type: string;
}


