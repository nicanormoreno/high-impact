interface geolocation {
    creationDate: Date;
    id: number;
    lat: number;
    lng: number;
}

interface address {
    city: string;
    creationDate: Date;
    geolocation: geolocation
    housenumber:number;
    id:number;
    postalcode:string;
    street:string;
}

export interface atm {
    address: address;
    creationDate: Date;
    id: number;
    type: string;
}


