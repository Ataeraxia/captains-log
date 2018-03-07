import { Accounts } from "meteor/accounts-base";

// Why do I need '.ui.'?
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});