import { Document, Schema, Model, model} from "mongoose";

let RefNumCounterTypeSchema = new Schema({
  "_id":String, 
  "regimeName":String,
  "seq":{type:Number, default:1}

});
export default RefNumCounterTypeSchema;
