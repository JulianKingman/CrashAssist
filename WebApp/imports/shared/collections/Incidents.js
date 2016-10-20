/**
 * Created by Julian on 9/15/16.
 */
const Incidents = new Mongo.Collection("incidents");
import moment from 'moment';
import {BaseModel} from 'meteor/socialize:base-model';
import {Users} from './Users.js';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// import {Ground} from 'meteor/ground:db';

import '../SimpleSchemaExtension.js';

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

// Ground.Collection(Incidents);

export {Incidents, Incident};
