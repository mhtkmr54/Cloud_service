var googleAuth = require('google-oauth-jwt');

googleAuth.authenticate({
  // use the email address of the service account, as seen in the API console
  email: 'shaastra-cld@shaastra-cloud-service.iam.gserviceaccount.com',
  // use the PEM file we generated from the downloaded key
  keyFile: 'google-oauth.pem',
  // specify the scopes you wish to access
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
}, function (err, token) {
  console.log(token);
});