<?php

require_once('Config.php');
require_once('DbHelper.php');


$POST_DATA = file_get_contents("php://input");
$POST_DATA = json_decode($POST_DATA);
//#################################################################################
//#################################################################################
//#################################################################################

$app_username = $POST_DATA->app_username;
$app_password = $POST_DATA->app_password;


$db_helper = new DbHelperClass;
$con = $db_helper->GetConnection();
//#################################################################################
//#################################################################################
//#################################################################################


$app_username = $con->real_escape_string($app_username);
$app_password = $con->real_escape_string($app_password);

$app_password_md5 = md5($app_password);

$where_expression = "`" . constant('FIELD_USERNAME_IN_USERS') . "` = '$app_username' AND " .
						"`" . constant('FIELD_PASSWORD_IN_USERS') . "` = '$app_password_md5'";
$sql_query = $db_helper->CreateSelectSqlQuery( constant('TABLE_NAME_USERS') , $where_expression );

$data = $db_helper->GetDataFromDB($con,$sql_query);

$expired_status = false;
if($data[0] != null){

	$client_app_id = $data[0]->id;
	$expire_date = $data[0]->expire;

	UpdateLastLoginAttempt($client_app_id);

	$data[0]->expire_status = GetExpireStatus($expire_date);

}

	
	
echo json_encode($data);







//#################################################################################
//#################################################################################
//#################################################################################

function UpdateLastLoginAttempt($client_app_id){
	$current_time = (new DateTime())->setTimezone(new DateTimeZone('Asia/Tel_Aviv'));
	$current_time = $current_time->format('Y-m-d H:i:s');


	$db_helper = new DbHelperClass;
	$con = $db_helper->GetConnection();

	$table_name = constant('TABLE_NAME_USERS');

	$update_expression = "`" . constant('FIELD_LAST_LOGIN_ATTEMPT_IN_USERS') . "` = '$current_time'";


	$where_expression = "`" . constant('FIELD_USER_ID_IN_USERS') . "` = '$client_app_id'";



	$sql_query = $db_helper->CreateUpdateSqlQuery($table_name,$update_expression,$where_expression);

	$data = $db_helper->UpdateDataInDB($con,$sql_query);

}
//#################################################################################
//#################################################################################
//#################################################################################

function GetExpireStatus($expire_date_str){

	$current_date = (new DateTime())->setTimezone(new DateTimeZone('Asia/Tel_Aviv'));
	$current_date = $current_date->format('Y-m-d');

	$expire_date = (new DateTime($expire_date_str))->format('Y-m-d');

		if($current_date > $expire_date){
			return true;
		}

	return false; //The date is NOT expired
}

?>