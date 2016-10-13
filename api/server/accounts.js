import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';


Accounts.onCreateUser(function(options, user){
    const { deviceId } = options;
    
    //create list for deviceId in case user has multiple devices.
    if(deviceId){
        user.devices = [deviceId];
    }
    return user;
});

Accounts.registerLoginHandler('device', function(options) {
    let userId;
    const { deviceId } = options;

    //user can't be logged in, and we need a deviceId to look for
    if(!Meteor.userId() && deviceId) {
        const user = Meteor.users.findOne({deviceIds:deviceId});

        if(user) {
            if(user.services.password){
                //matched deviceId is registered to a pasworded account
                throw new Meteor.Error(403, "Must Login With Password")
            }else{
                //we have an account but password is not set yet
                userId = user._id;
            }
        }else {
            /* account must have a username or email. Since username isn't really
               used we'll just set it to a random string and set the email once the user
               sets it and a password.
             */
            const username = Random.id();

            userId = Accounts.createUser({username, deviceId});
        }
        
        //finally if we found or created a user, return the userId so they get logged in
        return { userId };
   }
});