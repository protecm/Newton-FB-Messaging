var login = require('../../index.js');

login({email: "protechmulti@gmail.com", password: "p1r2o3t4"}, function callback (err, api) {
    if(err) return console.error(err);

    var yourID = "100013013058636";   //Tomy Goldman
    var msg = {body: "Hey!"};
    api.sendMessage(msg, yourID);

});
