/**
 * Created by Julian on 9/15/16.
 */
const UserForms = new Mongo.Collection("user_forms");

let Schemas = {};

Schemas.UserForms = new SimpleSchema({
    user_id: {
        type: String
    },
    incident_id: {
        type: String
    },
    form_id: {
        //the unique name of the form
        type: String
    },
    title: {
        type: String
    }
});

UserForms.attachSchema(Schemas.UserForms);

//collection hooks

// UserForms.before.insert((userId, doc) => {});
// UserForms.after.insert((userId, doc) => {});
// UserForms.before.update((userId, doc, fieldNames, modifier, options) => { });
// UserForms.after.update((userId, doc, fieldNames, modifier, options) => {});
// UserForms.before.remove((userId, doc) => {});
// UserForms.after.remove((userId, doc) => {});
// UserForms.before.upsert((userId, selector, modifier, options) => {});
// UserForms.before.find((userId, selector, options) => {});
// UserForms.after.find((userId, selector, options, cursor) => {});
// UserForms.before.findOne((userId, selector, options) => {});
// UserForms.after.findOne((userId, selector, options, doc) => {});

//base model

class UserForm extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    user() {
        return Users.findOne(this.user_id);
    }

    incident() {
        return UserIncidents.findOne(this.incident_id);
    }

    inputs() {
        return UserInputs.find({form_id: this._id});
    }
}

UserForm.attachCollection(UserForms);

//allow/deny

UserForms.allow({
    insert(userId, userForm){
    },
    update(userId, userForm){
    },
    remove(userId, userForm) {
    }
});

export {UserForms, UserForm};
