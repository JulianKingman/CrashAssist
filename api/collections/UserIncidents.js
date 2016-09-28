/**
 * Created by Julian on 9/15/16.
 */
import { BaseModel } from 'meteor/socialize:base-model';

const UserIncidents = new Mongo.Collection("user_incidents");

let Schemas = {};

Schemas.UserIncidents = new SimpleSchema({
    user_id: {
        type: String,
        label: "User"
    },
    title: {
        type: String
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
    }
});

UserIncidents.attachSchema(Schemas.UserIncidents);

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

class UserIncident extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    user() {
        return Users.findOne(this.user_id);
    }

    forms() {
        return UserForms.find({form_id: this._id});
    }

    inputs() {
        return UserInputs.find({form_id: this._id});
    }
}

UserIncident.attachCollection(UserIncidents);

//allow/deny

UserIncidents.allow({
    insert(userId, userIncident){
    },
    update(userId, userIncident){
    },
    remove(userId, userIncident) {
    }
});

export {UserIncidents, UserIncident};
