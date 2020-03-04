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
 *	Copyright (c) 2020 by Marc Anton Dahmen
 *	http://marcdahmen.de
 *
 *	Licensed under the MIT license.
 *	http://automad.org/license
 */


namespace Automad\GUI\Components\Modal;
use Automad\GUI\Text as Text;


defined('AUTOMAD') or die('Direct access not permitted!');


/**
 *	The link modal component. 
 *
 *	@author Marc Anton Dahmen
 *	@copyright Copyright (c) 2020 Marc Anton Dahmen - <http://marcdahmen.de>
 *	@license MIT license - http://automad.org/license
 */

class Link {


	/**
	 *  Create the modal dialog for adding links.
	 * 
	 * 	@return string The HTML for the modal dialog
	 */

	public static function render() {

		$title = Text::get('link_title');
		$btnLink = Text::get('btn_link');
		$btnClose = Text::get('btn_close');
		$placeholder = Text::get('link_placeholder');

		return <<< HTML

			<div id="am-link-modal" class="uk-modal">
				<div class="uk-modal-dialog">
					<div class="uk-modal-header">
						$title
						<a href="#" class="uk-modal-close uk-close"></a>
					</div>
					<div class="am-form-input-button uk-form uk-flex">
						<div class="uk-autocomplete uk-width-1-1">
							<input class="uk-form-controls uk-width-1-1" type="text" placeholder="$placeholder">
							<script type="text/autocomplete">	
								<ul class="uk-nav uk-nav-autocomplete uk-autocomplete-results">
									{{~items}}
										<li data-value="{{ \$item.value }}">
											<a>
												<i class="uk-icon-link"></i>&nbsp;
												{{ \$item.title }}
											</a>
										</li>
									{{/items}}
								</ul>
							</script>
						</div>	
						<button type="button" class="uk-button uk-button-large uk-text-nowrap">
							<i class="uk-icon-link"></i>&nbsp;
							$btnLink
						</button>
					</div>
					<div class="uk-modal-footer uk-text-right">
						<button type="button" class="uk-modal-close uk-button">
							<i class="uk-icon-close"></i>&nbsp;
							$btnClose
						</button>
					</div>
				</div>
			</div>

HTML;

	}
	

}