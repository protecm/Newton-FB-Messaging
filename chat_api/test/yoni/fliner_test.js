var login = require('../../index.js');
var fs = require('fs');

var fb_username = "itzika26@walla.com";
var fb_password = "djroy035718717";
var friends_output_file_name = 'fliner_friends.json';

var message = {body: "הערב נפגשים ב morena  חגיגות יום ההולדת של חן יום טוב. יהודה נח ומוזס 13 תל אביב. ומחר שישי בדי בר הרצליה שיהיה לך סופש מקסים."};
var static_interval_time = 4000;

var min_interval = 4000;
var range_interval = 2500;

var female_gender = "female_singular";

var max_messages_count = 5;

var i = 0;
var len;
var random_interval = Math.floor(Math.random() * range_interval) + min_interval;

var friends_data; 
var TimeoutMessage;
var FacebookApi;


login({email: fb_username, password: fb_password}, function callback (err, api) {
    
    if(err) return console.error(err);

    api.getFriendsList(function(err, data) {
    	
        if(err) return console.error(err);

        //fs.writeFileSync( friends_output_file_name , JSON.stringify(data) );
        FacebookApi = api;
        friends_data = data;
        len = friends_data.length;
    	console.log(len);


        TimeoutMessage = setTimeout(MessageTimeoutFunction , random_interval);
        
    	
  	});

});


function MessageTimeoutFunction(){
            console.log('Position: ' + i + ' / ' + len + ' ,Sleep for: ' + random_interval);

            if(i< len){

                        var fb_id = friends_data[i].userID;
                        var gender = friends_data[i].gender;

                        if(gender == female_gender){
                            SendFbMessage(FacebookApi,fb_id,message);
                        }
                        
                        i++;
                        random_interval = Math.floor(Math.random() * range_interval) + min_interval;
                        TimeoutMessage = setTimeout(MessageTimeoutFunction , random_interval);
            }else{
                clearTimeout(TimeoutMessage);
            }
};



function SendFbMessage(api,fb_id,msg){
    api.sendMessage(msg, fb_id);
};
