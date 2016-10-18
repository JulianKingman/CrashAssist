import {Incidents} from '/imports/api/collections/Incidents.js';

Meteor.publish(null, function(){
    return Incidents.find({userId:this.userId, completed:false});
}, {is_auto:true});
