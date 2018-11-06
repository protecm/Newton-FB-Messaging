var ps = require('ps-node');

// A simple pid lookup
ps.lookup({
    command: 'java',
    arguments: 'newton_msg.jar',
    }, function(err, resultList ) {
        console.log('ps - callback - start');
        
        if (err) {
            throw new Error( err );
        }

        resultList.forEach(function( process ){
            if( process ){
                console.log( 'PID: %s, COMMAND: %s, ARGUMENTS: %s', process.pid, process.command, process.arguments );
                KillProcess(process.pid);
            }
        });

        console.log('ps - callback - end');
});



function KillProcess(process_pid){
    ps.kill( process_pid, function( err ) {
        if (err) {
            throw new Error( err );
        }
        else {
            console.log( 'Process %s has been killed!', process_pid );
        }
    });
}