import { Incidents } from '/imports/collections/Incidents.js';

Meteor.publish('SingleIncident', function(_id) {
    return Incidents.find({userId: this.userId, _id});
});
