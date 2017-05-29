var db = require("../models");

module.exports = function(callback) {
  // recreate client table
  db.client.sync({ force: true }).then(function() {
    // create username with username: user and
    // password: user
    db.client.create({
      username: 'user',
      password: '$2a$08$hWnaJqetws4sQr/S3iLKxui0i3s8EyNXuC4svUqOwFVtEbyMfUDS6',
      firstName: 'Peter',
      lastName: 'Markoski',
      userName: 'PMark',
      email: "Pmarko.alt@gmail.com",
      password: "123test",
      streetAddress: '123 Fake Street',
      city: 'Washington',
      state: "DC",
      zipcode: "20002"
    }).then(callback)
  })
}
