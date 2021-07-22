<?php

class CustomHttpRequest extends CHttpRequest
{
    public function getIsSecureConnection()
	{
		return (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=='on' || $_SERVER['HTTPS']==1)
			|| isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO']=='https') || ($_SERVER['SERVER_PORT'] == 8085 && strpos($_SERVER['SERVER_NAME'], 'preventcar') === false);
	}

}
?>