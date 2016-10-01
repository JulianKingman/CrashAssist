/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("incidents");
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';


let Schemas = {};

Schemas.Incidents = new SimpleSchema({
    user_id: {
        type: String,
        label: "User"
    },
    title: {
        type: String,
        autoValue: ()=> {
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
    "driverInfo.name": {type: String, srf: {type: Text}},
    "driverInfo.address": {type: String, srf: {type: Text}},
    "driverInfo.phone": {type: String, srf: {type: Phone}},
    "driverInfo.email": {type: String, srf: {type: Email}},
    "driverInfo.license": {type: String, srf: {type: Text}},
    //[passenger info]
    "passengerInfo.$.name": {type: String, srf: {type: Text}},
    "passengerInfo.$.phone": {type: String, srf: {type: Phone}},
    "passengerInfo.$.email": {type: String, srf: {type: Email}},
    //vehicle info
    "vehicleInfo.make": {type: String, srf: {type: Text}},
    "vehicleInfo.model": {type: String, srf: {type: Text}},
    "vehicleInfo.year": {type: Number, srf: {type: Number}},
    "vehicleInfo.plate": {type: String, srf: {type: Text}},
    //owner info
    "ownerInfo.name": {type: String, optional: true, srf: {type: Text}},
    "ownerInfo.phone": {type: String, optional: true, srf: {type: Phone}},
    "ownerInfo.email": {type: String, optional: true, srf: {type: Email}},
    "ownerInfo.license": {type: String, optional: true, srf: {type: Text}},
    //insurance info
    "insuranceInfo.company": {type: String, srf: {type: Text}},
    "insuranceInfo.policyNumber": {type: String, srf: {type: Text}},
    "insuranceInfo.agent": {type: String, srf: {type: Text}},
    //time & location
    "timeLocation.date": {type: Date, srf: {type: Date}},
    "timeLocation.time": {type: String, srf: {type: Text}},
    "timeLocation.location": {type: String, srf: {type: Text}},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String, srf: {type: Text}},
    "trafficInfo.trafficControls": {type: String, srf: {type: Text}},
    //Witness Information
    "witnessInfo.$.name": {type: String, srf: {type: Text}},
    "witnessInfo.$.phone": {type: String, srf: {type: Phone}},
    "witnessInfo.$.email": {type: String, srf: {type: Email}},
    "witnessInfo.$.testimony": {type: String, srf: {type: Textarea}},
    //driver statement
    "driverStatement": {type: String, srf: {type: Textarea}},
    //sketch photo public id
    "sketch": {type: String, srf: {type: Photo}},
    //array of photo public ids
    "photos": {type: [String], srf: {type: Photo}},
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