/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("incidents");
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import TextInput from '../../ui/components/FormElements/TextInput.jsx';
import NumberInput from '../../ui/components/FormElements/NumberInput.jsx';
import TextareaInput from '../../ui/components/FormElements/TextareaInput.jsx';
import DateInput from '../../ui/components/FormElements/DateInput.jsx';
import PhotoInput from '../../ui/components/FormElements/PhotoInput.jsx';
import TelInput from '../../ui/components/FormElements/TelInput.jsx';
import EmailInput from '../../ui/components/FormElements/EmailInput.jsx';

let Schemas = {};

Schemas.Incidents = new SimpleSchema({
    userId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        autoValue: function () {
            if (this.isInsert) {
                return this.userId;
            }
        },
        index: 1,
        denyUpdate: true
    },
    title: {
        type: String,
        autoValue: function () {
            if (!this.isSet) {
                return `${moment().format('MM/DD/YY')} incident`;
            }
        }
    },
    dateCreated: {
        type: Date,
        autoValue: function () {
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
    "driverInfo.name": {type: String, optional: true, srf: {type: TextInput}},
    "driverInfo.address": {type: String, optional: true, srf: {type: TextInput}},
    "driverInfo.phone": {type: String, optional: true, srf: {type: TelInput}},
    "driverInfo.email": {type: String, optional: true, srf: {type: EmailInput}},
    "driverInfo.license": {type: String, optional: true, srf: {type: TextInput}},
    //[passenger info]
    "passengerInfo.$.name": {type: String, srf: {type: TextInput}, optional: true},
    "passengerInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
    "passengerInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
    //vehicle info
    "vehicleInfo.make": {type: String, srf: {type: TextInput}}, optional: true,
    "vehicleInfo.model": {type: String, srf: {type: TextInput}}, optional: true,
    "vehicleInfo.year": {type: Number, srf: {type: NumberInput}, optional: true},
    "vehicleInfo.plate": {type: String, srf: {type: TextInput}}, optional: true,
    //owner info
    "ownerInfo.name": {type: String, optional: true, srf: {type: TextInput}},
    "ownerInfo.phone": {type: String, optional: true, srf: {type: TelInput}},
    "ownerInfo.email": {type: String, optional: true, srf: {type: EmailInput}},
    "ownerInfo.license": {type: String, optional: true, srf: {type: TextInput}},
    //insurance info
    "insuranceInfo.company": {type: String, srf: {type: TextInput}, optional: true},
    "insuranceInfo.policyNumber": {type: String, srf: {type: TextInput}, optional: true},
    "insuranceInfo.agent": {type: String, srf: {type: TextInput}, optional: true},
    //time & location
    "timeLocation.date": {type: Date, srf: {type: DateInput}, optional: true},
    "timeLocation.time": {type: String, srf: {type: TextInput}, optional: true},
    "timeLocation.location": {type: String, srf: {type: TextInput}, optional: true},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String, srf: {type: TextInput}, optional: true},
    "trafficInfo.trafficControls": {type: String, srf: {type: TextInput}, optional: true},
    //Witness Information
    "witnessInfo.$.name": {type: String, srf: {type: TextInput}, optional: true},
    "witnessInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
    "witnessInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
    "witnessInfo.$.testimony": {type: String, srf: {type: TextareaInput}, optional: true},
    //driver statement
    "driverStatement": {type: String, srf: {type: TextareaInput}, optional: true},
    //sketch photo public id
    "sketch": {type: String, srf: {type: PhotoInput}, optional: true},
    //array of photo public ids
    "photos": {type: [String], srf: {type: PhotoInput}, optional: true},
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
        this.update({$set: {completed: true}});
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
