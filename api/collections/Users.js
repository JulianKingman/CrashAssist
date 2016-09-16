/**
 * Created by Julian on 9/15/16.
 */
Users = Meteor.users();

class User extends BaseModel {
    constructor(document) {
        super(document);  //Must call super passing in the document.
    }

    incidents() {
        return UserIncidents.find({user_id: this._id});
    }

    forms() {
        return UserForms.find({user_id: this._id});
    }

    inputs() {
        return UserInputs.find({user_id: this._id});
    }
}

export {Users, User};
