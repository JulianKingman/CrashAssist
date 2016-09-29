/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("user_incidents");
import moment from 'moment';

let Schemas = {};

Schemas.Incidents = new SimpleSchema({
    user_id: {
        type: String,
        label: "User"
    },
    title: {
        type: String,
        autovalue: ()=> {
            return `${moment().format('mm/dd/yy')} incident`;
        }
    },
    dateCreated: {
        type: Date,
        autoValue: ()=> {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    //driver info
    "driverInfo.name": {type: String},
    "driverInfo.address": {type: String},
    "driverInfo.phone": {type: String},
    "driverInfo.email": {type: String},
    "driverInfo.license": {type: String},
    //[passenger info]
    "passengerInfo.$.name": {type: String},
    "passengerInfo.$.phone": {type: String},
    "passengerInfo.$.email": {type: String},
    //vehicle info
    "vehicleInfo.make": {type: String},
    "vehicleInfo.model": {type: String},
    "vehicleInfo.year": {type: Number},
    "vehicleInfo.plate": {type: String},
    //owner info
    "ownerInfo.name": {type: String, optional: true},
    "ownerInfo.phone": {type: String, optional: true},
    "ownerInfo.email": {type: String, optional: true},
    "ownerInfo.license": {type: String, optional: true},
    //insurance info
    "insuranceInfo.company": {type: String},
    "insuranceInfo.policyNumber": {type: String},
    "insuranceInfo.agent": {type: String},
    //time & location
    "timeLocation.date": {type: Date},
    "timeLocation.time": {type: String},
    "timeLocation.location": {type: String},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String},
    "trafficInfo.trafficControls": {type: String},
    //Witness Information
    "witnessInfo.$.name": {type: String},
    "witnessInfo.$.phone": {type: String},
    "witnessInfo.$.email": {type: String},
    "witnessInfo.$.testimony": {type: String},
    //driver statement
    "driverStatement": {type: String},
    //sketch photo public id
    "sketch": {type: String},
    //array of photo public ids
    "photos": {type: [String]},

});

Incidents.attachSchema(Schemas.UserIncidents);

//collection hooks

// UserIncidents.before.insert((userId, doc) => {});
// UserIncidents.after.insert((userId, doc) => {});
// UserIncidents.before.update((userId, doc, fieldNames, modifier, options) => { });
// UserIncidents.after.update((userId, doc, fieldNames, modifier, options) => {});
// UserIncidents.before.remove((userId, doc) => {});
// UserIncidents.after.remove((userId, doc) => {});
// UserIncidents.before.upsert((userId, selector, modifier, options) => {});
// UserIncidents.before.find((userId, selector, options) => {});
// UserIncidents.after.find((userId, selector, options, cursor) => {});
// UserIncidents.before.findOne((userId, selector, options) => {});
// UserIncidents.after.findOne((userId, selector, options, doc) => {});

//base model

class Incident extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    user() {
        return Users.findOne(this.user_id);
    }

    // forms() {
    //     return UserForms.find({form_id: this._id});
    // }
    //
    // inputs() {
    //     return UserInputs.find({form_id: this._id});
    // }
}

Incident.attachCollection(Incidents);

//allow/deny

Incidents.allow({
    insert(userId, userIncident){
    },
    update(userId, userIncident){
    },
    remove(userId, userIncident) {
    }
});

export {Incidents, Incident};