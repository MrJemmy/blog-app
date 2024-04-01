const revokedTokens = new Set();
// replace this with mongodb collection

function addRevokedToken(token) {
    revokedTokens.add(token);
}

function isTokenRevoked(token) {
    return revokedTokens.has(token);
}

module.exports = { addRevokedToken, isTokenRevoked };