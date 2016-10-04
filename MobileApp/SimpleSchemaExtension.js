/**
 * Created by Julian on 10/4/16.
 */
import {Match} from 'meteor/check';

SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
});