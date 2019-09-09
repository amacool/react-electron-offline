import { Document, Schema, Model, model} from "mongoose";


let idDocTypeSchema = new Schema({type :String, enum:["Passport", "National Identification Number"]});


let entryStatusSchema = new Schema({type:String, enum : ["ACTIVE","PENDING","ON-HOLD","REMOVED" ]},
    { _id : false });

    let languageSchema = new Schema({"language":[{type:String, enum:["EN",
"AR",
"CH",
"FR",
"SP",
"RU"]}]});



let identityTypeSchema = new Schema( {type: Map, of: String});
let categoryTypeSchema = new Schema({type: Map, of: String});

// look into enums here again
let livingStatusTypeSchema = new Schema({type:String, enum:["Alive",
"Deceased",
"Presumably Deceased"]});
let nameOrgScrptSchema = new Schema({type: Map, of: String});

let un_country_listSchema = new Schema( {
    "record": [
        {
            "UN_name": String,
            "M49_code" : Number,
            "ISO_code" : String,
            "en_Short" : String,
            "fr_Short" : String,
            "sp_Short" : String,
            "ru_Short" : String,
            "ch_Short" : String,
            "ar_Short" : String,
            "en_remark": String,
            "UN_Membership" : Number,
            "en_Formal" : String,
            "fr_Formal" : String,
            "sp_Formal" : String,
            "ru_Formal" : String,
            "ch_Formal" : String,
            "ar_Formal" : String
    }]
});
let translationsSchema = new Schema(
    {"translation":[{type: Map, of: String, "_id":false} ]
});





let lookupTypeSchema = new Schema(
     {"entryStatus" :[ {"EN": {type:String,"_id":false}},  {"EN": {type:String,"_id":false}},  {"EN": {type:String,"_id":false}}, {"EN": {type:String,"_id":false}},  {"EN": {type:String,"_id":false}},  {"EN": {type:String,"_id":false}} ],
   "entryType":{"EN":{type:Map, of: String,  "_id" : false }},
   "idTyp1":  {"EN": {type:Map, of: String, "_id"  : false}},
   "idCategory":{"EN": {type: Map, of: String, "_id":false}},
   "dobType": {"EN": {type: Map, of: String, "_id":false}},
   "dobSubset": {"EN": {type: Map, of: String, "_id":false}},
   "biometricType": {"EN": {type: Map, of: String, "_id":false}},
   "livingStatus" :{"EN":  [{type:String, "_id":false}]},
   "nameOrgSptType":{"EN": {type: Map, of: String, "_id":false}},
   "scriptType":{"EN":  {type: Map, of: String, "_id":false}},
   "regime" : [{ type: Map, of: String, "_id":false}],
   "language" : {"EN": { type: Map, of: String, "_id":false}},
    "un_country_list": un_country_listSchema,
    "translations":translationsSchema,
    "gender":[{"EN": {type:String, "_id":false}}],
    "docType1":[{"EN": {type :String, "_id":false}}],
   "measures":[{"EN": {type:String, "_id":false}}],
   "features":[{"EN": {type:String, "_id":false}}],
   "pressReleaseUpdteTyp":[{type :String, "_id":false}],
});  
export default lookupTypeSchema;