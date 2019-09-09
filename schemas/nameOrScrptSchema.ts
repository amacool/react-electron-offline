import { Document, Schema, Model, model} from "mongoose";

let nameOrScptSchema =  new Schema({"nameType":String,"order":Number,"script":String,"value":String}, {versionKey:false, _id:false});
export default nameOrScptSchema;

