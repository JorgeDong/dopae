clientID = "926517746531-kfe16pa96qse9qrpakbkvjur830rp734.apps.googleusercontent.com"
clientSecret = "ICknhfhuEFDTgt2yyYCDf0hu"

let infoAuth = {
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: 'http://localhost:3000/api/users/google/redirect'
}

module.exports = infoAuth