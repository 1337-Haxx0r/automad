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
 *	Copyright (c) 2014-2018 by Marc Anton Dahmen
 *	http://marcdahmen.de
 *
 *	Licensed under the MIT license.
 *	http://automad.org/license
 */


/*
 *	Handling forms. 
 */

+function(Automad, $, UIkit) {

	Automad.form = {
		
		unsavedClassPrefix: 'am-unsaved-',
		
		dataAttr: {
			
			/*
			 *	Important attributes to handle forms.
			 *
			 *
			 * 	FORM ATTRIBUTES:
			 *	
			 * 	data-am-handler="handler"			Generally, all forms with a [data-am-handler] attribute will be sumbitted to their AJAX handler, 
			 *										specified in "data-am-handler".
			 *										For example: 
			 * 										"<form data-am-handler="page_data"></form>"
			 *										will submit the form to "?ajax=page_data"
			 *
			 *      								Note that a page can only (!) have once a handler with the same name.
			 *      								Having multiple forms with the same handler confuses button and watch states.
			 *
			 * 	data-am-url="page"					To notify the AJAX handler, that the request belongs to a certain page, the URL has to be 
			 *										included in the request.
			 *										Therefore the data attribute "data-am-url" must be added to the form tag. 
			 *						
			 *	data-am-init						Automatically submit form when a page gets loaded.
			 *
			 * 	data-am-auto-submit					Automatically submit form on changes. Must be added to a button.
			 *
			 * 	data-am-close-on-success="#form"	Closes a modal window with the given ID on success.
			 *
			 * 	data-am-confirm="Text..."			Confirm submission
			 *
			 * 
			 * 	INPUT ATTRIBUTES:
			 *
			 *	data-am-enter="#button"				Trigger click event on pressing the enter key. Must be added to an input field.
			 *
			 *      data-am-watch-exclude			Exclude field from being watched for changes.
			 *
			 *
			 * 	BUTTON ATTRIBUTES:
			 *
			 *	data-am-submit="handler"			A button or link with that attribute will be used as submit button for a form having a
			 * 										"data-am-handler" attribute set to the given handler value.
			 * 										Note that those buttons automatically get disabled on load and re-enable on changes.
			 */
			
			handler: 		'data-am-handler',
			url:			'data-am-url',
			submit:			'data-am-submit',
			init:			'data-am-init',
			autoSubmit:		'data-am-auto-submit',
			close:			'data-am-close-on-success',
			confirm:		'data-am-confirm',
			enter:			'data-am-enter',
			watchExclude:	'data-am-watch-exclude'
			
		},
		
		// Post form.
		ajaxPost: function(e) {
			
			/*
			 *	Generally, all forms with a [data-am-handler] attribute will be sumbitted to their AJAX handler,
			 * 	specified in "data-am-handler".
			 *
			 * 	For example: 
			 *  "<form data-am-handler="page_data"></form>"
			 *  will submit the form to "?ajax=page_data"
			 *
			 * 	Server Data:
			 * 	The function expects the data from the server to be in JSON format.
			 *  	
			 *  1.	data.redirect
			 *   	will redirect the page to the given URL.
			 *
			 * 	2.	data.html
			 * 		if any string in data.html gets returned from the server, 
			 * 		the form's (inner) HTML will be replaced.
			 * 		
			 *  3.	data.error
			 *   	will alert the error message in a notification box.
			 *
			 * 	4.	data.success
			 * 		will alert the success message in a notification box.
			 *
			 *  5.	data.debug
			 *      Outputs debug info to the console.
			 */
			
			var	f = Automad.form,
				da = f.dataAttr,
				$form = $(e.target),
				
				// Action
				handler = $form.data(Automad.util.dataCamelCase(f.dataAttr.handler)),
				
				// Optional URL parameter.
				// Only needed, to identify a page, in case the form relates to a certain page (edit_page.php).
				// Can be omitted for general form actions.
				url = $form.data(Automad.util.dataCamelCase(f.dataAttr.url));
							
			// Get parameters.	
			var	param =	$form.serializeArray();
			
			// Add URL to parameters, if existing.	
			if (url) {
				param.push({name: 'url', value: url});
			}	
			
			// Post form data to the handler.
			$.post('?ajax=' + handler, param, function(data) {
			
				// Debug info.
				if (data.debug) {
					Automad.debug.log(handler, data.debug);
				}
				
				// In case the returned JSON contains a redirect URL, simply redirect the page.
				// A redirect might be needed, in case other elements on the page, like the navigation, have to be updated as well.
				if (data.redirect) {
					window.location.href = data.redirect;
				}

				// If HTML gets returned within the JSON data, replace the form's (inner) HTML.
				if (data.html) {
					$form.html(data.html);
				}
				
				// Display error, if existing.
				if (data.error) {
					Automad.notify.error(data.error);
				}
				
				// Display success, if existing.
				if (data.success) {
					Automad.notify.success(data.success);
				}
				
				// If the request returns no error, optionally close wrapping modal.
				// Note that this can be done with adding 'data-am-close-on-success="#modal"' attribute to a form.
				if (!data.error) {
							
					// Close wrapping modal if form has 'data-am-close-on-success="#modal"' attribute. 
					var modalSelector = $form.data(Automad.util.dataCamelCase(f.dataAttr.close));
					
					if (modalSelector) {
						UIkit.modal(modalSelector).hide();
					}
					
				}
				
			}, 'json');
				
		},
		
		// Confirm submission.
		confirm: function(e) {
			
			e.preventDefault();
				
			var	f = Automad.form,
				$form = $(e.target),
				confirmMessage = $form.data(Automad.util.dataCamelCase(f.dataAttr.confirm));
			
			// If confirmation is required (confirmMessage is not empty) 
			// and the form is not empty (avoid confirm box for data-am-init forms).
			if (confirmMessage && $form.find('input').length > 0) {
				
				// Wait for confirmation.	
				UIkit.modal.confirm(confirmMessage, function(){
					f.ajaxPost(e);
				});
				
			} else {
				
				// No confirmation required.
				f.ajaxPost(e);
				
			}
				
		},
		
		// Init form events.
		init: function() {
			
			
			var	$doc = $(document),
				f = Automad.form,
				da = f.dataAttr;
			
			
			// Submitting forms.
			
			// Handle AJAX post on submit event.
		 	$doc.on('submit', '[' + da.handler + ']', f.confirm);
			
			// Submit forms when clicking buttons (possibly outside the form) having "data-am-submit" attribute.
			$doc.on('click', '[' + da.submit + ']', function(e) {
				
				var	handler = $(this).data(Automad.util.dataCamelCase(da.submit));
				
				e.preventDefault();
				$('form[' + da.handler + '="' + handler + '"]').submit();
				
			});
			
			// Submit forms with a data-am-init attribute automatically on load.
			$doc.ready(function() {

				// All forms with attribute [data-am-init] get submitted when page is ready to get initial content via AJAX.
			 	$('[' + Automad.form.dataAttr.init + ']').trigger('submit');

			});
			

			// Handle enter key.
			
			// Disable form submission on pressing enter in input field in general, if form has 'data-am-handler' attribute.
			// Prevent accidental submission of parent form when pressing enter in nested and injected input fields 
			// such as the file rename dialog.
			$doc.on('keydown', '[' + da.handler + '] input', function(e) {
				
				if (e.which == 13) {
					e.preventDefault();
				}
				
			});
			
			// Explictly enable submission of form when pressing enter key in input with 'data-am-enter' attribute
			// by triggering a click event on the given button id.
			$doc.on('keydown', '[' + da.enter + ']', function(e) {
				
				if (e.which == 13) {
					
					var	button = $(e.target).data(Automad.util.dataCamelCase(da.enter));
					
					$(button).click();
					
				}
				
			});
			
			
			// Watch changes - handle button status and prevent leaving page with unsaved changes.
			
			// Automatically submit forms with attribute data-am-auto-submit on changes.
			$doc.on('change drop cut paste', '[' + da.autoSubmit + '] input, [' + da.autoSubmit + '] textarea, [' + da.autoSubmit + '] select', function(e) {
				$(e.target).closest('form').submit();
			});
			
			// Disable all submit buttons with a data-am-submit attribute initially when ajax completes or the document is ready.
			// Note that only buttons get disabled. If in some cases it is not wanted to disable a <button> (for example "Delete Page" button),
			// a normal <a> tag can be used instead to submt the form. The <a> link will never be disabled.
			$doc.on('ready', function() {
				$('button[' + da.submit + ']').prop('disabled', true);
			});
			
			$doc.on('ajaxComplete', function(e, xhr, settings) {
				
				// On an 'ajaxComplete' event it is important to actually only disabled the related submit button and
				// not just all on the current page. Otherwise a file upload would disable the save button of the page
				// data section as well. Therefore the actual ajax request has to be analysed.
				var	handler = settings.url.replace('?ajax=', '');
				
				$('button[' + da.submit + '="' + handler + '"]').prop('disabled', true);
				
			});
			
			// Add 'am-unsaved-{handler}' class to the <html> element on form changes
			// and re-enable related (only!) submit buttons after touching any form element.
			$doc.on('change drop cut paste keydown', 
				'[' + da.handler + ']:not([' + da.autoSubmit + ']) input:not([' + da.watchExclude + ']), ' +
				'[' + da.handler + ']:not([' + da.autoSubmit + ']) textarea:not([' + da.watchExclude + ']), ' +
				'[' + da.handler + ']:not([' + da.autoSubmit + ']) select:not([' + da.watchExclude + '])', 
				function() {
				
					var 	$form = $(this).closest('[' + da.handler + ']'),
						handler = $form.data(Automad.util.dataCamelCase(da.handler));
					
					$('html').addClass(f.unsavedClassPrefix + handler);
					$('button[' + da.submit + '="' + handler + '"]:disabled').prop('disabled', false);
					
					// Change label color to flag input as changed.
					$(this).prevAll('.uk-form-label').addClass('am-form-changed');
					$(this).closest('.uk-form-icon, .uk-htmleditor, [data-am-toggle], [data-am-datetime]').prev('.uk-form-label').addClass('am-form-changed');
					$(this).closest('.uk-grid').prev('.uk-form-label').addClass('am-form-changed');
					
				}
			);
			
			// Remove 'am-unsaved-{handler}' class from <html> element on saving a form with a matching {handler}.
			$doc.on('submit', '[' + da.handler + ']', function(){
				
				var handler = $(this).data(Automad.util.dataCamelCase(da.handler));
				
				$('html').removeClass(f.unsavedClassPrefix + handler);
				
			});
			
			// Define onbeforeunload function.
			window.onbeforeunload = function() {
				
				if ($('html[class*="am-unsaved-"]').length) {
					return 'You have unsaved chages!';
				}
				
			}
			
			
			// Events.
			
			// Handle modal events.
			$doc.on('ready ajaxComplete', f.modalEvents);
						
			// CodeMirror - trigger 'change' event on original textareas when a CodeMirror instance fires its 'change' event.	
			$doc.on('ready ajaxComplete', function(){
				
				setTimeout(function(){
					
					// Only select instance once (:not(.am-change-event)) to avoid stacking events.
					$('.CodeMirror:not(.am-change-event)').each(function(){
						
						var $cm = $(this),
							cm = $cm[0].CodeMirror,
							
							// Find textareas before to trigger change event on.
							$ta = $cm.prev();
							
						// Apply '.am-change-event' class to avoid re-adding the event on every ajaxComplete event.
						// Note that only '.CodeMirror:not(.am-change-event)' get selected above.
						$cm.addClass('am-change-event');
					
						cm.on('change', function() {
							$ta.trigger('change');	
						});
						
					})
					
				}, 500);
				
			});	

				
		},
		
		// Modal actions. (hide & show)
		// Reset a form when closing the wrapping modal window and refresh a form[data-am-init] when opening.
		modalEvents: function() {
		
			var $modal = $('.uk-modal');
			
			// Remove all events before adding again, since the 'ajaxComplete' event will be trigger multiple times.
			$modal.off('show.uk.modal.automad.form');
			$modal.off('hide.uk.modal.automad.form');
			
			// On.
			$modal.on({
				
				'show.uk.modal.automad.form': function(){
				
					// Update [data-am-init] forms inside (!) a modal window.
				
					// Content can have changed after closing a modal before. When re-opening the modal,
					// the form might have outdated values inside. To update that information, 
					// forms with a 'data-am-init' attribute must be cleared and re-submitted to
					// pull updates. 
					// Clearing the form is important to avoid auto-submitting unwanted changes 
					// before updateing the form.
					$(this).find('[' + Automad.form.dataAttr.init + ']').each(function() {
						$(this).empty().submit();
					});
					
					// Focus first input (not disabled and not on any touch device).
					if ($('html.uk-notouch').length) {
						$(this).find('input:not(:disabled, [type="hidden"], [type="search"])').first().focus();
					}
					
				},
				
				'hide.uk.modal.automad.form': function(){
					
					// Clear registered changes class from html and reset the form.
					$(this).find('form').each(function() {
						
						var handler = $(this).data(Automad.util.dataCamelCase(Automad.form.dataAttr.handler));
						
						// Remove unsaved class from html element.
						$('html').removeClass(Automad.form.unsavedClassPrefix + handler);
						
						// Reset form.
						this.reset();
						
					});
					
				}
				
			});
			
		}
		
	};

	Automad.form.init();
	
}(window.Automad = window.Automad || {}, jQuery, UIkit);