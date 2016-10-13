/**
 * Created by Julian on 10/13/16.
 */
// #SERVER

if (Meteor.isServer)(
    Cloudinary.config = {
        cloud_name: 'crash-assist',
        api_key: '433828571112967',
        api_secret: '_ujL-pUC-Jw-aHbHzgEBRKA8xu4'
    }
)

if (Meteor.isClient) {
    $.cloudinary.config = {
        cloud_name: "crash-assist"
    }
}


// # Rules are all optional
// Cloudinary.rules.delete ()=>{
// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass
// @public_id # The public_id that is being deleted
// }

// Cloudinary.rules.signature = -> # This one checks whether the user is allowed to upload or not
// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass
//
// Cloudinary.rules.private_resource = ->
// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass
//
// Cloudinary.rules.download_url = ->
// @userId is "my_user_id" # The rule must return true to pass validation, if you do not set a rule, the validation will always pass