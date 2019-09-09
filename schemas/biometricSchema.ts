import { Document, Schema, Model, model} from "mongoose";
let BiometricSchema =  new Schema( {
   
           
                    "biometric" : {
                            "biometricType" : String,
                            "value" : String
                    },
                    "biometricAttch" : {
                            "href" : String,
                            "value" : String
                    },
                    "note" : String
               
   
}, {versionKey:false, _id:false});
export default BiometricSchema;