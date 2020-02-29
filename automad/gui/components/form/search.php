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


namespace Automad\GUI\Components\Form;


defined('AUTOMAD') or die('Direct access not permitted!');


/**
 *	The search field component. 
 *
 *	@author Marc Anton Dahmen
 *	@copyright Copyright (c) 2020 Marc Anton Dahmen - <http://marcdahmen.de>
 *	@license MIT license - http://automad.org/license
 */

class Search {


	/**
	 *	Create a search field.
	 *      
	 *  @param string $tooltip
	 *  @return string The HTML for the search field
	 */
	
	public static function render($placeholder = '', $tooltip = '') {
		
		if ($tooltip) {
			$tooltip = 'title="' . $tooltip . '" data-uk-tooltip="{pos:\'bottom\'}" ';
		}
		
		return  '<form class="uk-form uk-width-1-1" action="' . AM_BASE_INDEX . AM_PAGE_DASHBOARD . '" method="get" data-am-autocomplete>' .
					'<input type="hidden" name="context" value="search" />' .
					'<div class="uk-autocomplete uk-width-1-1">' .
						'<input ' .
						'class="uk-form-controls uk-width-1-1" ' .
						'name="query" ' .
						'type="search" ' .
						'placeholder="' . $placeholder . '" ' .
						$tooltip .
						'required ' .
						'/>' .
					'</div>' . 
				'</form>';
		
	}
	

}