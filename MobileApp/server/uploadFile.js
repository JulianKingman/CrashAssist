/**
 * Created by Julian on 10/13/16.
 */
import {Meteor} from 'meteor/meteor';
Meteor.methods({
    "custom.sign": function(ops) {
        console.log("custom c.sign")
        var auth_function, signature;
        if (ops == null) {
            ops = {};
        }
        check(ops, Match.Optional(Object));
        this.unblock();
        if (Cloudinary.rules.signature) {
            this.options = ops;
            auth_function = _.bind(Cloudinary.rules.signature, this);
            if (!auth_function()) {
                throw new Meteor.Error("Unauthorized", "Signature not allowed");
            }
        }
        signature = Cloudinary.uploader.direct_upload("", ops);
        return signature;
    }
});