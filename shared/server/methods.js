import { Meteor } from 'meteor/meteor';
import { Incidents } from '../../api/collections/Incidents.js';

Meteor.methods({
    /*
        if the user has created an incident on one devices as a anonymous user
        but has an account that the device is not registered on, then when they
        log in to their account we need to find that anonymous account and transfer
        the device and any incidents created to the old account
     */
    CheckDuplicateAccountByDevice: function(devices) {
        let userId = Meteor.userId();

        var duplicate = Meteor.users.findOne({userId:{$ne:userId}, devices});

        if(duplicate){
            Meteor.users.update(userId, {$addToSet:{devices}});
            Incidents.update({userId:duplicate._id}, {$set:{userId}});
        }
    },
    setEmailAddress: function(emailAddress){
        Accounts.addEmail(Meteor.userId(), emailAddress)
    }
});