import { Document, Schema, Model, model} from "mongoose";
import mongoose from 'mongoose';
import mongooseCounter from 'mongoose-counters';

const counter = mongooseCounter(mongoose);
const entryTyp = ["Entity", "Vessel", 'Individual', "Aircraft"]; // aw should this come from a database?



import identitySchema from './idSchema';
import submissionSchema from './submissionSchema';

//aw figure out additionalInformation -- where it should go, as we are goign to eventually use langs and remove language
// const counter = mongooseCounter(mongoose);
const workflowStatus = ["NEW", "PENDING", 'AMEND', "ACTIVE", "ONHOLD", "ONHOLDEXTENDED", "SUBMIT4REVIEW",  "DELISTED", 'RECORDREVIEW', "REMOVED" ];
let sanctionsLstSchema = new Schema({"sanctionEntry":{
    "addtlInfo": String,
    "entry":{"entryStatus":{type:String, enum:workflowStatus, required:true}, "entryType":String,
    "entryId" : {type:Number, required: true}, "statusModifiedDte": Date, "isStatusCurrent":Boolean,
    "rptStatusCount":{type:Number, default: 0},"rptStatusDates":[Date],
    //"entryType":String, // "removedDte":Date, "removedReason":String,
    // "language"[langz],  //aw should be deleted, as we wouldn't be using this
    "language":[{"additionalInformation":String, "identity":[identitySchema],
    "lang":String,"narrativeUpdatedOn":[String],"narrativeWebsiteDate":String,"reasonForListing":String,
    "relatedList":String 
    }],
    
    "listings":{"unListType":[{"interpolUNSN":String,"listName":String,"measure":[String],"narrativeSummary":String,
    "note":String,"referenceNumber":String, "updates":{updated:[{"pressRelease":String,"updateType":String,"updatedOn":String, "pressReleaseId":String, "refNumOrEntryId":String }]},"unlstItmsDef": {"updates":{updated:[{"pressRelease":String,"updateType":String,"updatedOn":String, "pressReleaseId":String, "refNumOrEntryId":String }]}, "measure":[String] }}],
    },
    "remarks":String,
    "submission":submissionSchema
    },
    langs:{"idLst":[identitySchema], "lang":{type:String},
      "languagesUUID":String
    },
    "listngReason" : String,
    "narrUpdteOn" : [String],
    "narrWbSteDte" : String,
    // related list is used to relate an entity with individuals affiliated with it and vice versaor family members
    "relatedLst" :String, "activityLog":[{"activityDte":{type:Date, required:true},
        "userId":{type:String, required:true}, "userTask":{type:String, required:true},   "activityNotes":String,
      // prevState:{type:String, enum:workflowStatus}, currState:{type:String, enum:workflowStatus},
      // "refNum":String, 
       "orderId":{type:Number}}],
    "amendmentInfo":{"amendmentCount": {type:Number}, "amendmentDte": Date},
    "supersededInfo":{"isSuperSeded":Boolean, "supersededDte":Date},
    "ancestors":[{"identifier":mongoose.Types.ObjectId}], "parent":mongoose.Types.ObjectId,
    // entryStatusCreateDte is ALWAYS the same as the entry.statusModifiedDte above
    "siblings":[{"identifier":mongoose.Types.ObjectId, "entryId":Number, "entryStatus":String, "entryStatusCreateDte":Date}],
    // placeholder in case we need to keep track of the same individual, entity, vessel, etc. being sanctiond under another regime
    "sameSubjectFoundInEntries":[{"identifier":mongoose.Types.ObjectId}],
    "versionId": String,   
    "docUnderscoreId":String
    
    }}, {versionKey:false});
    // removing the counter as we this will muddy things up.  Will update this when needed at insert time.
// sanctionsLstSchema.plugin(counter, { incField: 'sanctionEntry.entry.entryId'});  


export default sanctionsLstSchema;

