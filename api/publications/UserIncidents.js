import { UserIncidents } from '/imports/api/collections/UserIncidents.js';

Meteor.publish('UserIncidents', function(){
   return UserIncidents.find({userId:this.userId});
});
