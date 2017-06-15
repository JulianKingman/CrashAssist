/**
 * Created by Julian on 12/3/16.
 */
import { Accounts } from 'meteor/accounts-base';

Accounts.emailTemplates.siteName = "Crash Assist";
Accounts.emailTemplates.from = "Crash Assist Admin <julian.kingman@gmail.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Crash Assist!";
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    return "After confirming your account, you can access your incident reports online."
        + " To confirm your account, simply click the link below:\n\n"
        + url;
};
Accounts.emailTemplates.resetPassword.from = () => {
    // Overrides value set in Accounts.emailTemplates.from when resetting passwords
    return "Crash Assist Password Reset <no-reply@crashassist.com>";
};

Accounts.emailTemplates.verifyEmail.text = (user, url)=> {

}