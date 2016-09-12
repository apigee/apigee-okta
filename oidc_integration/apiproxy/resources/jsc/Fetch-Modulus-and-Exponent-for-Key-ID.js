var desired_kid = context.getVariable('id_token.kid');
var jwks = JSON.parse(context.getVariable('okta_jwks'));

if (jwks.keys) {
    jwks.keys.forEach(function (key) {
        if (key.kty === "RSA" && key.kid == desired_kid) {
            context.setVariable('public_key.modulus', key.n);
            context.setVariable('public_key.exponent', key.e);
        }
    });
} else {
    throw new Error("No keys found in JWKS URI result");
}
