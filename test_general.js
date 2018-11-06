// var UTIL = require('./UTIL.js');
// var message = "שלום לכולם";


// var file_name_msg = './files/test_msg.json';
// var data = JSON.stringify(message);
// UTIL.SaveFile(file_name_msg,data);
/*
var stamp = new Date().getTime();
console.log(stamp);
*/
var ps = require('ps-node');

// A simple pid lookup
// ps.lookup({
//     command: 'java',
//     arguments: '',
//     }, function(err, resultList ) {
//     if (err) {
//         throw new Error( err );
//     }

//     resultList.forEach(function( process ){
//         if( process ){

//             console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
//         }
//     });
// });

// A simple pid lookup
ps.lookup({ pid: 11364 }, function(err, resultList ) {
    if (err) {
        throw new Error( err );
    }

    var process = resultList[ 0 ];

    if( process ){

        console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
    }
    else {
        console.log( 'No such process found!' );
    }
});