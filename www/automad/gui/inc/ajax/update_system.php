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
 *	AUTOMAD
 *
 *	Copyright (c) 2017 by Marc Anton Dahmen
 *	http://marcdahmen.de
 *
 *	Licensed under the MIT license.
 *	http://automad.org/license
 */


namespace Automad\GUI;


defined('AUTOMAD') or die('Direct access not permitted!');


/*
 *	Update Automad.
 */


// To prevent accidental updates within the development repository, exit updater in case the base directoy contains "/automad-dev".
if (strpos(AM_BASE_DIR, '/automad-dev') !== false) {
	
	$output['html'] = 	'<div class="uk-alert">' .
				'<span class="uk-text-large"><i class="uk-icon-code-fork"></i>&nbsp;&nbsp;</span>' .
				'Can\'t run updates within the development repository!' .
				'</div>';
	
} else {
	
	// Test if server supports all required functions/extensions.
	if (Update::supported()) {
		
		if (!empty($_POST['update'])) {
		
			$output = Update::run();
		
		} else {
		
			// Start buffering the HTML.
			ob_start();
	
			// Get version and test connection.
			if ($version = Update::getVersion()) {
		
				// Check if an the current installation is outdated.
				if (version_compare(AM_VERSION, $version, '<')) {
			
					Text::e('sys_update_available');
		
					?>
					<div class="uk-margin-large-top">
						<input type="hidden" name="update" value="run" />
						<button 
						type="submit" 
						class="uk-button uk-button-large uk-button-primary" 
						data-uk-toggle="{target:'#am-update-spinner',cls:'uk-icon-spin'}"
						>
							<i id="am-update-spinner" class="uk-icon-refresh"></i>&nbsp;
							<?php Text::e('sys_update_to'); ?>&nbsp;
							<span class="uk-badge"><?php echo $version; ?></span>
						</button>
					</div>
					<?php
			
				} else {
			
					?>
					<div class="uk-alert uk-alert-success">
						<?php Text::e('sys_update_not_required'); ?>
					</div>
					<?php
			
				}
		
			} else {
		
				?>
				<div class="uk-alert uk-alert-danger">
					<?php Text::e('error_update_connection'); ?>
				</div>
				<?php
		
			}
	
			// Save buffer to JSON array.
			$output['html'] = ob_get_contents();
			ob_end_clean();	
		
		}
		
	} else {
			
		$output['html'] = '<div class="uk-alert uk-alert-danger">' . Text::get('error_update_not_supported') . '</div>';
		
	}
	
}


echo json_encode($output);


?>