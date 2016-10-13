/**
 * Created by Julian on 10/13/16.
 */
import {Meteor} from 'meteor/meteor';
Meteor.methods({
   uploadImage(imageUrl){
       Cloudinary.upload(imageUrl, function(err,res){
           console.log(err, res);
       })
}
});