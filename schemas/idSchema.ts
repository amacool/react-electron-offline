import { Document, Schema, Model, model} from "mongoose";
import addressSchema  from './addrSchema';
import   documentSchema from './docSchema';
import  nameOrScptSchema from './nameOrScrptSchema';
import  biometricSchema  from './biometricSchema';


let identitySchema =  new Schema({"addresses":{"address":[addressSchema]}, "biometricData" :{"biometricInfo": [biometricSchema]},"category":String,
"comment":String,"designations":{"designation":[String]},
"dobs":{"dob":[{"date":String, "dateFrom":String,"dateTo":String,"dobSubset":String,"dobType":String,"note":String}]},

"documents":documentSchema, 

"entryFeatures":{"feature":[{"featureType":String,"status":String,"value":String, "note":String}], "note":String },

"gender":String,"livingStatus":String,"names":{"name":[nameOrScptSchema], "nameOrgSpt":[nameOrScptSchema]},

"nationalities":{"nationality":[String]},

"pobs":{"pob":[{"address":[addressSchema]}]},

"titles":{"title":[String]}, "typAttr":String, "type":String}, {versionKey:false, _id:false}); 
export default identitySchema;


