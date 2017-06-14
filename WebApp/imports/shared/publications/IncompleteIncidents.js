import {Incidents} from '/imports/collections/Incidents.js';

Meteor.publish(null, function(){
    return Incidents.find({userId:this.userId, completed:false});
}, {is_auto:true});
