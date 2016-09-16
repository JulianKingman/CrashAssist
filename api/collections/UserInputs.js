/**
 * Created by Julian on 9/15/16.
 */
const UserInputs = new Mongo.Collection("user_inputs");

//schema

let Schemas = {};

Schemas.UserInputs = new SimpleSchema({
    user_id: {
        type: String,
    },
    incident_id: {
        type: String
    },
    form_id: {
        //the unique name of the form
        type: String,
    },
    input_id: {
        type: String
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
    },
    dateUpdated: {
        type: Date,
        autoValue() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }
});

UserInputs.attachSchema(Schemas.UserInputs);

//collection hooks

// UserInputs.before.insert((userId, doc) => {});
// UserInputs.after.insert((userId, doc) => {});
// UserInputs.before.update((userId, doc, fieldNames, modifier, options) => { });
// UserInputs.after.update((userId, doc, fieldNames, modifier, options) => {});
// UserInputs.before.remove((userId, doc) => {});
// UserInputs.after.remove((userId, doc) => {});
// UserInputs.before.upsert((userId, selector, modifier, options) => {});
// UserInputs.before.find((userId, selector, options) => {});
// UserInputs.after.find((userId, selector, options, cursor) => {});
// UserInputs.before.findOne((userId, selector, options) => {});
// UserInputs.after.findOne((userId, selector, options, doc) => {});

//base model

class UserInput extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    user() {
        return Users.findOne(this.user_id);
    }

    incident() {
        return UserIncidents.findOne(this.incident_id);
    }

    form() {
        return UserForms.findOne(this.form_id);
    }
}

UserInput.attachCollection(UserInputs);

//allow/deny

UserInputs.allow({
    insert(userId, userInput){
    },
    update(userId, userInput){
    },
    remove(userId, userInput) {
    }
});

export {UserInputs, UserInput};