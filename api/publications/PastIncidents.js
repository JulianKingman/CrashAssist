import { Incidents } from '/imports/api/collections/Incidents.js';

Meteor.publish('PastIncidents', function(){
   return Incidents.find({userId:this.userId});
});
