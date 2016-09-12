#Why
You have a proxy to generate the access token.

Now you will have all the APIs protected by OAuth.

Now you will have a different proxy in Edge which you want to be OAuth protected, In that proxy first you will have a policy like this.
Verify-Access-Token.xml

Once your access-token is verified you will add another policy like: UseUser-JWT-in-Header.xml

This will do two things: Take the JWT form the custom variable and put it in a header (or you can out it in query or body or anything else)
Remove the access token from the request, because your backend does not need the access token.
