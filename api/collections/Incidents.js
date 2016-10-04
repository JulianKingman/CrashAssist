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
    completed: {
        type: Boolean,
        defaultValue: false,
        index: 1
    },
    //driver info
    "driverInfo.name": {type: String, srf: {type: "Text"}, optional: true},
    "driverInfo.address": {type: String, srf: {type: "Text"}, optional: true},
    "driverInfo.phone": {type: String, srf: {type: "Phone"}, optional: true},
    "driverInfo.email": {type: String, srf: {type: "Email"}, optional: true},
    "driverInfo.license": {type: String, srf: {type: "Text"}, optional: true},
    //[passenger info]
    "passengerInfo.$.name": {type: String, srf: {type: "Text"}, optional: true},
    "passengerInfo.$.phone": {type: String, srf: {type: "Phone"}, optional: true},
    "passengerInfo.$.email": {type: String, srf: {type: "Email"}, optional: true},
    //vehicle info
    "vehicleInfo.make": {type: String, srf: {type: "Text"}}, optional: true,
    "vehicleInfo.model": {type: String, srf: {type: "Text"}}, optional: true,
    "vehicleInfo.year": {type: Number, srf: {type: "Number"}, optional: true},
    "vehicleInfo.plate": {type: String, srf: {type: "Text"}}, optional: true,
    //owner info
    "ownerInfo.name": {type: String, optional: true, srf: {type: "Text"}},
    "ownerInfo.phone": {type: String, optional: true, srf: {type: "Phone"}},
    "ownerInfo.email": {type: String, optional: true, srf: {type: "Email"}},
    "ownerInfo.license": {type: String, optional: true, srf: {type: "Text"}},
    //insurance info
    "insuranceInfo.company": {type: String, srf: {type: "Text"}, optional: true},
    "insuranceInfo.policyNumber": {type: String, srf: {type: "Text"}, optional: true},
    "insuranceInfo.agent": {type: String, srf: {type: "Text"}, optional: true},
    //time & location
    "timeLocation.date": {type: Date, srf: {type: "Date"}, optional: true},
    "timeLocation.time": {type: String, srf: {type: "Text"}, optional: true},
    "timeLocation.location": {type: String, srf: {type: "Text"}, optional: true},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String, srf: {type: "Text"}, optional: true},
    "trafficInfo.trafficControls": {type: String, srf: {type: "Text"}, optional: true},
    //Witness Information
    "witnessInfo.$.name": {type: String, srf: {type: "Text"}, optional: true},
    "witnessInfo.$.phone": {type: String, srf: {type: "Phone"}, optional: true},
    "witnessInfo.$.email": {type: String, srf: {type: "Email"}, optional: true},
    "witnessInfo.$.testimony": {type: String, srf: {type: "Textarea"}, optional: true},
    //driver statement
    "driverStatement": {type: String, srf: {type: "Textarea"}, optional: true},
    //sketch photo public id
    "sketch": {type: String, srf: {type: "Photo"}, optional: true},
    //array of photo public ids
    "photos": {type: [String], srf: {type: "Photo"}, optional: true},
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

    markCompleted() {
        this.update({$set:{completed:true}});
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
