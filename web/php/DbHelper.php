<?php


class DbHelperClass{

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function GetConnection(){
		$con = new mysqli(constant('DB_HOST'),
							constant('DB_USER'),
							constant('DB_PASS'),
							constant('DB_NAME') );

		if( $con->connection_error ){
			die("Database connection error:" . $con->connection_error);
		}

		return $con;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateSelectSqlQuery($table_name,$where_expression){
		$sql_query = "SELECT * FROM $table_name WHERE $where_expression;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateSelectSqlQueryWithSpecificSelect($table_name,$select_expression,$where_expression){
		$sql_query = "SELECT $select_expression FROM $table_name WHERE $where_expression;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateJoinSelectSqlQuery($table_name,$where_expression,$join_expression){
		$sql_query = "SELECT * FROM $table_name $join_expression WHERE $where_expression;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateJoinSelectSqlQueryWithSpecificSelect($table_name,$select_expression,$where_expression,$join_expression){
		$sql_query = "SELECT $select_expression FROM $table_name $join_expression WHERE $where_expression;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateJoinSelectSqlQueryWithSpecificSelectAndExtra($table_name, $select_expression , $where_expression , $join_expression , $extra_expression){
		$sql_query = "SELECT $select_expression FROM $table_name $join_expression WHERE $where_expression $extra_expression;";

		return $sql_query;
	}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateDeleteSqlQuery($table_name,$where_expression){
		$sql_query = "DELETE FROM $table_name WHERE $where_expression;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateInsertSqlQuery($table_name , $fields , $values){
		$sql_query = "INSERT INTO $table_name ( $fields ) VALUES ( $values );" ;

		return $sql_query;
	}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function CreateUpdateSqlQuery($table_name,$update_expression,$where_expression){
		$sql_query = "UPDATE $table_name SET $update_expression WHERE $where_expression ;";

		return $sql_query;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function InsertDataToDB($con,$sql_query){
		$data = array();

			if($con->query($sql_query) === true){
				//success
				//echo "New record created successfully";
				$last_id = $con->insert_id;

				$data['status'] = true;
				$data['message'] = "New record created successfully";
				$data['insert_id'] = $last_id;
			}else{
				//no-success
				//echo "Error: " . $con->error;
				$data['status'] = false;
				$data['message'] = $con->error;
			}

		$con->close();
		return $data;
	}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function DeleteDataFromDB($con,$sql_query){
		$data = array();

			if($con->query($sql_query) === true){
				//success
				//echo "New record created successfully";
				$data['status'] = true;
				$data['message'] = "Deleted successfully";
			}else{
				//no-success
				//echo "Error: " . $con->error;
				$data['status'] = false;
				$data['message'] = $con->error;
			}

		$con->close();
		return $data;
	}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function UpdateDataInDB($con,$sql_query){
		$data = array();

			if($con->query($sql_query) === true){
				//success
				//echo "New record created successfully";
				$data['status'] = true;
				$data['message'] = "Record updated successfully";
			}else{
				//no-success
				//echo "Error: " . $con->error;
				$data['status'] = false;
				$data['message'] = $con->error;
			}

		$con->close();
		return $data;
	}
//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function GetDataFromDB($con,$sql_query){
		$query = $con->query($sql_query);
		$data = array();

			if( $query->num_rows > 0 ){
				while( $row = $query->fetch_object() ){
					$data[] = $row;
				}
			}else{
				$data[] = null;
			}


		$con->close();

		return $data;
	}

//#####################################################################################################
//#####################################################################################################
//#####################################################################################################
	function EscapeString($str){
		


		return $str;
	}

}//class DbHelperClass



?>