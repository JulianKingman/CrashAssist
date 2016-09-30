import { Incidents } from '/imports/api/collections/Incidents.js';

Meteor.publish('singleIncident', function(_id) {
    return Incidents.find(_id);
});
