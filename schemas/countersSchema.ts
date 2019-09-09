import { Document, Schema, Model, model} from "mongoose";
let CountersSchema =  new Schema({ _id : { type : String, required : true }, "seq":Number});
export default CountersSchema
