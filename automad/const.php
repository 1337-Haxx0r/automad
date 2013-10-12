<?php
/*
 *	                  ....
 *	                .:   '':.
 *	                ::::     ':..
 *	                ::.         ''..
 *	     .:'.. ..':.:::'    . :.   '':.
 *	    :.   ''     ''     '. ::::.. ..:
 *	    ::::.        ..':.. .''':::::  .
 *	    :::::::..    '..::::  :. ::::  :
 *	    ::'':::::::.    ':::.'':.::::  :
 *	    :..   ''::::::....':     ''::  :
 *	    :::::.    ':::::   :     .. '' .
 *	 .''::::::::... ':::.''   ..''  :.''''.
 *	 :..:::'':::::  :::::...:''        :..:
 *	 ::::::. '::::  ::::::::  ..::        .
 *	 ::::::::.::::  ::::::::  :'':.::   .''
 *	 ::: '::::::::.' '':::::  :.' '':  :
 *	 :::   :::::::::..' ::::  ::...'   .
 *	 :::  .::::::::::   ::::  ::::  .:'
 *	  '::'  '':::::::   ::::  : ::  :
 *	            '::::   ::::  :''  .:
 *	             ::::   ::::    ..''
 *	             :::: ..:::: .:''
 *	               ''''  '''''
 *	
 *
 *	AUTOMAD CMS
 *
 *	(c) 2013 by Marc Anton Dahmen
 *	http://marcdahmen.de
 *
 */


define('BASE_URL', $_SERVER['SCRIPT_NAME']);
 

define('SITE_CONTENT_DIR', 'content');
define('SITE_SETTINGS_FILE', 'settings.txt'); 
define('SITE_PAGES_DIR', 'pages');
define('SITE_THEMES_DIR', 'themes');
define('SITE_DEFAULT_THEME', 'standard');


define('PAGE_DEFAULT_TEMPLATE', 'default');


define('TEMPLATE_VAR_DELIMITER_LEFT', '$(');
define('TEMPLATE_VAR_DELIMITER_RIGHT', ')');
define('TEMPLATE_FN_DELIMITER_LEFT', '$[');
define('TEMPLATE_FN_DELIMITER_RIGHT', ']');


define('DATA_FILE_EXTENSION', 'txt');
define('DATA_BLOCK_SEPARATOR', '---');
define('DATA_PAIR_SEPARATOR', ':');
define('DATA_TAG_SEPARATOR', ',');
define('DATA_TAGS_KEY', 'tags');

 
include(BASE . '/automad/version.php');
 
 
?>
