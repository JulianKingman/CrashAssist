import { UserIncidents } from '/imports/api/collections/UserIncidents.js';

Meteor.publish('singleIncident', function(_id) {
    return UserIncidents.find(_id);
});
