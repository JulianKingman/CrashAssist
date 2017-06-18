const Incidents = new Mongo.Collection("incidents");
import React, {Component} from 'react';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';

// import TextInput from '../../ui/FormElements/TextInput.jsx';
// import NumberInput from '../../ui/FormElements/NumberInput.jsx';
// import TextareaInput from '../../ui/FormElements/TextareaInput.jsx';
// import DateInput from '../../ui/FormElements/DateInput.jsx';
// import PhotoInput from '../../ui/FormElements/PhotoInput.jsx';
// import TelInput from '../../ui/FormElements/TelInput.jsx';
// import EmailInput from '../../ui/FormElements/EmailInput.jsx';
// import ArrayField from '../../ui/FormElements/Array.jsx';
let TextInput = class extends Component{};
let NumberInput = class extends Component{};
let TextareaInput = class extends Component{};
let DateInput = class extends Component{};
let PhotoInput = class extends Component{};
let TelInput = class extends Component{};
let EmailInput = class extends Component{};
let ArrayField = class extends Component{};

const Schemas = {};

Schemas.Incidents = new SimpleSchema({
    _id: {type: String, index: 1, unique: 1},
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
            if (this.isInsert && !this.isSet) {
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
    currentStep: {
        type: Number,
        optional: true
    },
    completed: {
        type: Boolean,
        defaultValue: false,
        index: 1
    }
});

Incidents.attachSchema(Schemas.Incidents);

Schemas.formSchema = new SimpleSchema({
  safety: {type: Object, optional: true},
  "safety.carOff": {type: Boolean, optional: true, srf: {type: TextInput}},
  "safety.safePlace": {type: Boolean, optional: true, srf: {type: TextInput}},
  "safety.medicalAttention": {type: Boolean, optional: true, srf: {type: TextInput}},
  "safety.call911": {type: Boolean, optional: true, srf: {type: TextInput}},
  "safety.waitForPolice": {type: Boolean, optional: true, srf: {type: TextInput}},
  //dos & donts
  "dont.admitFault": {type: Boolean, optional: true, srf: {type: TextInput}},
  "dont.discussAccident": {type: Boolean, optional: true, srf: {type: TextInput}},
  "dont.diminishInjury": {type: Boolean, optional: true, srf: {type: TextInput}},
  "dont.acceptPayment": {type: Boolean, optional: true, srf: {type: TextInput}},
  "do.cooperate": {type: Boolean, optional: true, srf: {type: TextInput}},
  "do.collectInformation": {type: Boolean, optional: true, srf: {type: TextInput}},
    //driver info
    "driverInfo.licensePhoto": {type: Array, optional: true, srf: {type: PhotoInput}},
    "driverInfo.name": {type: String, optional: true, srf: {type: TextInput}},
    "driverInfo.address": {type: String, optional: true, srf: {type: TextInput}},
    "driverInfo.phone": {type: String, optional: true, srf: {type: TelInput}},
    "driverInfo.email": {type: String, optional: true, srf: {type: EmailInput}},
    "driverInfo.license": {type: String, optional: true, srf: {type: TextInput}},
    //[passenger info]
    "passengerInfo": {type: Array, optional: true, srf: {type: ArrayField}},
    "passengerInfo.$.name": {type: String, optional: true, srf: {type: TextInput}},
    "passengerInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
    "passengerInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
    //vehicle info
    "vehicleInfo.make": {type: String, optional: true, srf: {type: TextInput}},
    "vehicleInfo.model": {type: String, optional: true, srf: {type: TextInput}},
    "vehicleInfo.year": {type: Number, optional: true, srf: {type: NumberInput}},
    "vehicleInfo.plate": {type: String, optional: true, srf: {type: TextInput}},
    //owner info
    "ownerInfo.name": {type: String, optional: true, srf: {type: TextInput}},
    "ownerInfo.address": {type: String, optional: true, srf: {type: TextInput}},
    "ownerInfo.phone": {type: String, optional: true, srf: {type: TelInput}},
    "ownerInfo.email": {type: String, optional: true, srf: {type: EmailInput}},
    "ownerInfo.license": {type: String, optional: true, srf: {type: TextInput}},
    //insurance info
    "insuranceInfo.company": {type: String, optional: true, srf: {type: TextInput}},
    "insuranceInfo.policyNumber": {type: String, optional: true, srf: {type: TextInput}},
    "insuranceInfo.agent": {type: String, optional: true, srf: {type: TextInput}},
    //time & location
    "timeLocation.date": {type: Date, optional: true, srf: {type: DateInput}},
    "timeLocation.time": {type: String, optional: true, srf: {type: TextInput}},
    "timeLocation.location": {type: String, optional: true, srf: {type: TextInput}},
    //Traffic Information
    "trafficInfo.roadConditions": {type: String, optional: true, srf: {type: TextareaInput}},
    "trafficInfo.trafficControls": {type: String, optional: true, srf: {type: TextareaInput}},
    //Witness Information
    "witnessInfo": {type: Array, optional: true, srf: {type: ArrayField}},
    "witnessInfo.$": {type: Object, optional: true},
    "witnessInfo.$.infoPhoto": {type: Array, optional: true, srf: {type: PhotoInput}},
    "witnessInfo.$.name": {type: String, srf: {type: TextInput}, optional: true},
    "witnessInfo.$.phone": {type: String, srf: {type: TelInput}, optional: true},
    "witnessInfo.$.email": {type: String, srf: {type: EmailInput}, optional: true},
    "witnessInfo.$.testimony": {type: String, srf: {type: TextareaInput}, optional: true},
    //driver statement
    "driverStatement": {type: String, srf: {type: TextareaInput}, optional: true},
    //sketch photo public id
    "sketch": {type: Array, srf: {type: PhotoInput}, optional: true},
    //array of photo public ids
    "photos": {type: Array, srf: {type: PhotoInput}, optional: true},
    //injuries
    "injuries": {type: Array, srf: {type: PhotoInput}, optional: true},
    //Symptoms
    "symptoms": {type: Array, optional: true, srf: {type: TextInput}}
});

Incidents.attachSchema(Schemas.formSchema);

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

    setStep(value){
        this.update({$set: {currentStep: value}});
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