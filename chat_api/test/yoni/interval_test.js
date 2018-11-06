
var min_interval = 4000;
var range_interval = 2500;

/*
for(var i=0;i<10;i++){
	var random_interval = Math.floor(Math.random() * range_interval) + min_interval;
	console.log(random_interval);
}
*/

var i=0;
var len = 10;
var interval_time = Math.floor(Math.random() * range_interval) + min_interval;

var IntervalMessage = setTimeout(IntervalFunction , interval_time); // start setInterval as "run"



function IntervalFunction(){
            console.log('Position: ' + i + " Sleep for: " + interval_time);

            if(i< len){

                        i++;
                        //clearTimeout(IntervalMessage);
                        interval_time = Math.floor(Math.random() * range_interval) + min_interval;
                        IntervalMessage = setTimeout(IntervalFunction , interval_time);
            }else{
                clearTimeout(IntervalMessage);
            }
};


