/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("incidents");
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';

let Schemas = {};

Schemas.Incidents = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if(this.isInsert){
                return this.userId;
            }
        },
        index: 1,
        denyUpdate:true
    },
    title: {
        type: String,
        autoValue: function() {
            if(!this.isSet){
                return `${moment().format('MM/DD/YY')} incident`;
            }
        }
    },
    dateCreated: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true,
        index: 1
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
    "driverStatement": {
        type: String,
        optional: true
    },
    //sketch photo public id
    "sketch": {
        type: String,
        optional: true
    },
    //array of photo public ids
    "photos":  {
        type: [String],
        optional: true
    },

});

Incidents.attachSchema(Schemas.Incidents);

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
        return Users.findOne(this.userId);
    }
}

Incident.attachCollection(Incidents);

//allow/deny

Incidents.allow({
    insert(userId, Incident){
        return Incident.checkOwnership();
    },
    update(userId, Incident){
        return Incident.checkOwnership();
    },
    remove(userId, Incident) {
        return Incident.checkOwnership();
    }
});

export {Incidents, Incident};
