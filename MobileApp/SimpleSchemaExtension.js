/**
 * Created by Julian on 10/4/16.
 */
import {Match} from 'meteor/check';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
});