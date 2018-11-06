//##########################################################
//##########################################################
//##########################################################
const DEFAULT_HTTP_PORT = 8080;
const DEFAULT_SOCKET_PORT = 9090;

const RESPONSE_CODE_INTERNAL_SRV_ERROR = 500;
const RESPONSE_CODE_NOT_FOUND = 404;
const RESPONSE_CODE_OK = 200;

const RESPONSE_CONTENT_TYPE_TEXT_PLAIN = {'Content-Type' : 'text/plain'};
const RESPONSE_CONTENT_TYPE_TEXT_HTML = {'Content-Type': 'text/html'};
const RESPONSE_CONTENT_TYPE_TEXT_JS = {'Content-Type': 'text/javascript'};
const RESPONSE_CONTENT_TYPE_JSON = {'Content-Type': 'application/json'};



const MSG_NOT_FOUND = '404 - Not Found';

const ENCODING_UTF8 = 'utf-8';

const DB_SYS_USERS_FILE_NAME = __dirname + '\\db\\sys_users.db';
const DB_SYS_USERS_TASKS_FILE_NAME = __dirname + '\\db\\sys_users_tasks.db';
const DB_FB_USERS_FILE_NAME = __dirname + '\\db\\fb_users.db';

const PATH_NEWTON_JAR = __dirname + '\\driver\\newton_msg.jar';
const PATH_CHROME_DRIVER = __dirname + '\\driver\\chromedriver.exe';
const DRIVER_TYPE_CHROME = 'Chrome';
const DRIVER_TYPE_HTML_UNIT = 'HtmlUnit';

const DEFAULT_DRIVER_TYPE = 'HtmlUnit';
//const DEFAULT_DRIVER_TYPE = 'Chrome';

const KEY_TASK_ID = '-task';
const KEY_DRIVER = '-driver';
const KEY_USERS_FILE = '-users_file';
const KEY_FB_USER = '-fb_user';
const KEY_FB_PASS = '-fb_pass';
const KEY_MSG = '-msg_file';
const KEY_DRIVER_TYPE = '-driver_type';
const KEY_START_POS = '-start_pos';
const KEY_MAX_POS = '-max_pos';
const KEY_THREADS = '-threads';

//##########################################################
//##########################################################
//##########################################################

module.exports = {
	DB_SYS_USERS_FILE_NAME: DB_SYS_USERS_FILE_NAME,
	DB_SYS_USERS_TASKS_FILE_NAME: DB_SYS_USERS_TASKS_FILE_NAME,
	DB_FB_USERS_FILE_NAME: DB_FB_USERS_FILE_NAME,
	DEFAULT_HTTP_PORT: DEFAULT_HTTP_PORT,
	DEFAULT_SOCKET_PORT: DEFAULT_SOCKET_PORT,
	RESPONSE_CODE_INTERNAL_SRV_ERROR: RESPONSE_CODE_INTERNAL_SRV_ERROR,
	RESPONSE_CODE_NOT_FOUND: RESPONSE_CODE_NOT_FOUND,
	RESPONSE_CODE_OK: RESPONSE_CODE_OK,
	RESPONSE_CONTENT_TYPE_TEXT_PLAIN: RESPONSE_CONTENT_TYPE_TEXT_PLAIN,
	RESPONSE_CONTENT_TYPE_TEXT_HTML: RESPONSE_CONTENT_TYPE_TEXT_HTML,
	RESPONSE_CONTENT_TYPE_TEXT_JS: RESPONSE_CONTENT_TYPE_TEXT_JS,
	MSG_NOT_FOUND: MSG_NOT_FOUND,
	ENCODING_UTF8: ENCODING_UTF8,
	PATH_NEWTON_JAR: PATH_NEWTON_JAR,
	PATH_CHROME_DRIVER: PATH_CHROME_DRIVER,
	DRIVER_TYPE_CHROME: DRIVER_TYPE_CHROME,
	DRIVER_TYPE_HTML_UNIT: DRIVER_TYPE_HTML_UNIT,
	DEFAULT_DRIVER_TYPE: DEFAULT_DRIVER_TYPE,
	KEY_TASK_ID: KEY_TASK_ID,
	KEY_DRIVER: KEY_DRIVER,
	KEY_USERS_FILE: KEY_USERS_FILE,
	KEY_FB_USER: KEY_FB_USER,
	KEY_FB_PASS: KEY_FB_PASS,
	KEY_MSG: KEY_MSG,
	KEY_DRIVER_TYPE: KEY_DRIVER_TYPE,
	KEY_START_POS: KEY_START_POS,
	KEY_MAX_POS: KEY_MAX_POS,
	KEY_THREADS: KEY_THREADS
};
