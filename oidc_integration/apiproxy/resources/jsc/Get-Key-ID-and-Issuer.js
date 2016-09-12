var raw_id_token = context.getVariable('request.formparam.assertion');
context.setVariable('raw_id_token', raw_id_token);
var unvalidated_id_token = jwtDecode(raw_id_token);

if (unvalidated_id_token === null) {
    throw new Error("Invalid id_token");
}

var unvalidated_kid = unvalidated_id_token.header.kid;
var unvalidated_iss = unvalidated_id_token.payload.iss;

var validated_kid = unvalidated_kid.replace(/[^a-zA-Z0-9-_]/g, "");

var validated_iss = false;
var domain = unvalidated_iss.split('/')[2];
var domain_parts = domain.split('.');
var domain_name = domain_parts.slice(domain_parts.length - 2, domain_parts.length).join('.')
if (domain_name !== "okta.com" && domain_name !== "oktapreview.com") {
    throw new Error("Invalid issuer");
} else {
    validated_iss = unvalidated_iss;
}

context.setVariable('id_token.kid', validated_kid);
context.setVariable('id_token.iss', validated_iss);
context.setVariable('id_token.iss_domain', domain);
