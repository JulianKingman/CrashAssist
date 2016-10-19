import { Incidents } from '/imports/shared/collections/Incidents.js';

Meteor.publish('SingleIncident', function(_id) {
    return Incidents.find({userid:this.userId, _id});
});
