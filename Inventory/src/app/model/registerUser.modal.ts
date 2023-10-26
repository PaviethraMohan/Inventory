import { categoryMaster } from "./categoryMaster.model";
import { countryMasters } from "./country.model";
import { stateMaster } from "./stateMaster.model";

export interface RegisterUser{
    registerId:number;
    firstName:string;
    lastName:string;
    email:string;
    phoneNo:string;
    gender:string;
    dateOfBirth:Date;
    address:string;
    countryMasters:countryMasters;
    country:number;  
    stateMaster:stateMaster;      
    state:string;
    postalCode:number;
    categoryMaster:categoryMaster;
    category:string;
    
}