<?php

use Firebase\JWT\ExpiredException;

/**
 * @author      Agustín Ronco
 * @license     http://mit-license.org/
 */

require_once "jwt/JWT.php";
require_once "RestSessionModel.php";

class RestSession
{
    const privateKey = <<<EOD
-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgHi32+wfFbDsVBJLYJOX79T8ypoWqygKb81waKjI6Yj66cdfHYds
ZvqXuyfowmJBUrGfOmPc+jnUeXVn62rbrabntMQDsL1PZ6Rqg3H9J4ux9L2tzfcF
RQ1a+UihwbNeGlVFWOt5k/OJV0UtZmiee0rtGQ2czWIJSJlBMf6dHRFhAgMBAAEC
gYAy4gyo8lFKSdMGAw+qJpjIxeUAHh32uq91gLQcsNL/EgQILWdc9axSZDJXGB0X
HUGl7N/HyBUQ2yZ2/l6UpBQFeJ7vXDCknVF86+nwyfvaX+N//FRaEmMb4TnolrAR
+CZT1I3k3qoGcTYcRdJ+DLJYD09Zyez72Oa0NcidpQN7gQJBAMhLnWDmd9ToYLuZ
/Un/wCa7Fq25k+PEUpgSsn+W6yxJ3reUaGMUM2WQJl420bYaulunYCI4FilGtsdj
sNuLyFUCQQCaSpsnDZTmT96CJJMiZOs9jD5kfzxLRNd8o1N6PMqjnTJR2QkDh6LT
OKZMRNTSIcyt2DNvZlAx1SG/mXxDTKDdAkBmcDXHT1fOLiL7D6C5bfHqXRkWNKls
fgX3/OgJ1Tfl6Mndfit9MOGwee8FlGfhCP5yzcGe/qxm4+GrTFMxleYZAkBQnCnz
fWUN7yyRUgqNLay5u0vdtZwKtyzeMXarppc4ZCimGn5bGcI4GKDJuCx4nLATI6G7
0fiUEIZRVB9YCfEBAkEAl4v5G2susVnqgVPN3LLnyWrWwYNpmm9hL7ZUmzQzWwBj
l1eUnPqrq8bXEZX6VEhUnfPoykXddHTw98tvlUj3PQ==
-----END RSA PRIVATE KEY-----
EOD;

    const publicKey = <<<EOD
-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHi32+wfFbDsVBJLYJOX79T8ypoW
qygKb81waKjI6Yj66cdfHYdsZvqXuyfowmJBUrGfOmPc+jnUeXVn62rbrabntMQD
sL1PZ6Rqg3H9J4ux9L2tzfcFRQ1a+UihwbNeGlVFWOt5k/OJV0UtZmiee0rtGQ2c
zWIJSJlBMf6dHRFhAgMBAAE=
-----END PUBLIC KEY-----
EOD;

    public $time = 3600;

    public function generateToken($device_uid = null, $exp = null)
    {
        if (empty($exp))
            $exp = $this->time;

        $session = $this->generateSessionUID();
        $time = time() + $exp;
        $token = array(
            "exp" => $time,
            "session" => $session
        );
        $jwt = \Firebase\JWT\JWT::encode($token, self::privateKey, 'RS256');

        try {
            RestSessionModel::createSession($session, $jwt, $time, $device_uid);
        } catch (Exception $e) {
            throw $e;
        }

        return $jwt;
    }

    public function regenerateToken($session, $exp = null)
    {
        if (empty($exp))
            $exp = $this->time;

        $time = time() + $exp;
        $token = array(
            "exp" => $time,
            "session" => $session
        );

        $jwt = \Firebase\JWT\JWT::encode($token, self::privateKey, 'RS256');

        try {
            RestSessionModel::updateSession($session, $jwt, $time);
        } catch (Exception $e) {
            throw $e;
        }

        return $jwt;
    }

    public function validateToken($jwt)
    {
        $decoded_array = [];

        try {
            $decoded = \Firebase\JWT\JWT::decode($jwt, self::publicKey, array('RS256'));
            $decoded_array = (array)$decoded;

            RestSessionModel::validateSession($decoded_array['session'], $jwt);
        /*} catch (ExpiredException $ee) {
            \Firebase\JWT\JWT::$leeway = 7200000;
            $decoded = \Firebase\JWT\JWT::decode($jwt, self::publicKey, array('RS256'));
            $decoded_array = (array)$decoded;
            
            RestSessionModel::deleteSession($decoded_array['session']);
            throw $ee;*/
        } catch (Exception $e) {
            throw $e;
        }

        return $decoded_array['session'];
    }

    public function deleteToken($session)
    {
        try {
            RestSessionModel::deleteSession($session);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function getExpiredSession($jwt) {
        $decoded_array = [];

        try {
            \Firebase\JWT\JWT::$leeway = 720000;
            $decoded = \Firebase\JWT\JWT::decode($jwt, self::publicKey, array('RS256'));
            $decoded_array = (array)$decoded;

            RestSessionModel::validateSession($decoded_array['session'], $jwt);
        } catch (ExpiredException $ee) {
            \Firebase\JWT\JWT::$leeway = 7200000;
            $decoded = \Firebase\JWT\JWT::decode($jwt, self::publicKey, array('RS256'));
            $decoded_array = (array)$decoded;
        } catch (Exception $e) {
            throw $e;
        }

        return $decoded_array['session'];
    }

    public function generateSessionUID($trim = true)
    {
        // Windows
        if (function_exists('com_create_guid') === true) {
            if ($trim === true)
                return trim(com_create_guid(), '{}');
            else
                return com_create_guid();
        }

        // OSX/Linux
        if (function_exists('openssl_random_pseudo_bytes') === true) {
            $data = openssl_random_pseudo_bytes(16);
            $data[6] = chr(ord($data[6]) & 0x0f | 0x40);    // set version to 0100
            $data[8] = chr(ord($data[8]) & 0x3f | 0x80);    // set bits 6-7 to 10
            return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
        }

        // Fallback (PHP 4.2+)
        mt_srand((double)microtime() * 10000);
        $charid = strtolower(md5(uniqid(rand(), true)));
        $hyphen = chr(45);                  // "-"
        $lbrace = $trim ? "" : chr(123);    // "{"
        $rbrace = $trim ? "" : chr(125);    // "}"
        $guidv4 = $lbrace .
            substr($charid, 0, 8) . $hyphen .
            substr($charid, 8, 4) . $hyphen .
            substr($charid, 12, 4) . $hyphen .
            substr($charid, 16, 4) . $hyphen .
            substr($charid, 20, 12) .
            $rbrace;
        return $guidv4;
    }
}