/**
 * ProjectBlocker.js
 * =================
 * A handy jQuery solution for blocking responsive, IE,
 * or incomplete bits from being seen while in development.
 *
 * Version:	v1.0.0
 * Release:	February 07, 2015
 * Site:	http://github.com/mike-zarandona/ProjectBlocker
 * Author:	Mike Zarandona | http://twitter.com/mikezarandona
**/

;(function($) {

	var defaults = {
		responsive: 'hide',
		minWidth: 0,

		homepage: 'show',
		homepageSelector: null,

		ie: 'hide'
	};


	$.projectBlocker = function(options) {

		options = $.extend({}, defaults, options);

		var mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) ? true : false,
			blocked = false,		// watch for block status and hold site parameter
			siteVar,				// holds the value of `getURLParameter`
			lsKey,					// holds the value of the localstorage developer mode key value pair

			$head = $('head'),		// site head
			$body = $('body')
		;

		// Add Google font and the styles to the <head> of the document
		$head
			.append('<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400,700|Open+Sans+Condensed:300" />')
			.append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css" />')
			.append('<style type="text/css">' + pbStyles + '</style>')
		;

		// If the viewport meta doesn't exist in the <head> on mobile append it
		if ( mobile ) {
			if ( $('meta[name=viewport]').length === 0 ) {
				$head.append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
			}
		}

		// Increment width to make the math a bit easier
		options.minWidth++;


		/**
		 * TIME TO DO STUFF
		**/
		// Check URL parameter for `/?dev=off`
		if ( getURLParameter('dev') == 'off' ) {
			if ( testLocalStorage() ) {
				notifyTheConsole(0);
				localStorage.clear();
			}
		}

		// Grab the hostname to enable `/?dev=true`
		if ( testLocalStorage() ) {
			lsKey = localStorage.getItem( 'PB-' + document.location.hostname );

			// Alert the user that dev mode is stil on
			if ( lsKey == 'true' ) {
				notifyTheConsole(1);
			}
		}

		// Block message ONLY if dev mode is not on, and localStorage item is not set
		if ( (getURLParameter('dev') != 'true') && (lsKey != 'true') ) {

			// If we're blocking internet explorer
			if ( options.ie == 'hide' ) {
				// IE 11
				var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
				if ( isIE11 ) {
					blockerBot5000('ie');
				}

				// IE <= 10
				if ( /*@cc_on!@*/false ) {
					blockerBot5000('ie');
				}
			}


			// If we're blocking the homepage
			if ( (options.homepage == 'hide') && (!blocked) ) {
				if ( $(options.homepageSelector).length > 0 ) {
					blockerBot5000('homepage');
				}
			}


			// If we're blocking responsive design
			if ( (options.responsive == 'hide') && (!blocked) ) {
				blockerBot5000('rwd');
			}
		}
		else {
			if ( testLocalStorage() ) {
				// set the localStorage token to let in devs
				localStorage.setItem('PB-' + document.location.hostname, 'true');
			}
		}



		function blockerBot5000(blockType) {

			// Add overlay content to the <body>
			$body.append(pbOverlayDOM);

			var $overlay = $('.pb-responsive-overlay'),
				$msgWrapper = $('.pb-message-wrapper'),
				$pixelCtr = $('.pb-pixel-counter')
			;


			// IE
			if ( blockType == 'ie' ) {
				// set the min width on the `<body/>`
				$body.css( 'min-width', options.minWidth + 'px' );

				// Move the signature into the orange circle
				$pixelCtr.html( $('.pb-message-wrapper .signed') );

				// engage the overlay
				$overlay.addClass( 'block no-arrows' );
				$msgWrapper.addClass('ie');

				// set the "blocked" flag
				blocked = true;
			}

			// Homepage
			else if ( blockType == 'homepage' ) {
				// set the min width on the `<body/>
				$body.css( 'min-width', options.minWidth + 'px' );

				// Move the signature into the orange circle
				$pixelCtr.html( $('.pb-message-wrapper .signed') );

				// engage the overlay
				$overlay.addClass( 'block no-arrows' );
				$msgWrapper.addClass('homepage');

				// set the "blocked" flag
				blocked = true;
			}

			// Responsive
			else if ( blockType == 'rwd' ) {
				// type the message wrapper to `rwd`
				$msgWrapper.addClass('rwd');

				// If the window width is less than our target width OR is a mobile device, show the overlay on load
				if ( (window.innerWidth < options.minWidth) || (mobile) ) {
					// set the min width on the `<body/>`
					$body.css('min-width', options.minWidth + 'px');

					// set the "pixels left to go"
					$('.pb-pixel-counter span').html(options.minWidth - window.innerWidth);

					// engage the overlay
					$overlay.addClass('show');
				}

				// Bind to the window.resize event
				$(window).on('resize', function() {
					if ( window.innerWidth < options.minWidth ) {
						// set the min width on the `<body/>`
						$body.css('min-width', options.minWidth + 'px');

						// engage the overlay
						$overlay.addClass('show');

						// update the pixel counter
						$('.pb-pixel-counter span').html(options.minWidth - window.innerWidth);
					}
					else {
						// remove the min width on the `<body/>
						$body.css('min-width', '0');

						// disengage the overlay
						$overlay.removeClass('show');
					}
				});
			}
		}



		// A test to see if localStorage and sessionStorage & error handling
		function testLocalStorage() {
			if ( typeof(Storage) !== void(0) ) { return true; }
			else {
				notifyTheConsole(2);
				return false;
			}
		}



		// Retrieve URL parameters
		function getURLParameter(name) {
			name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
			var regexS = "[\\?&]"+name+"=([^&#]*)";
			var regex = new RegExp( regexS );
			var results = regex.exec( window.location.href );
			if( results === null )
				return "";
			else
				return results[1];
		}



		// console notifier
		function notifyTheConsole(type) {
			if ( type === 0 ) {
				console.info('ProjectBlocker: Developer Mode OFF.');
			}
			else if ( type == 1 ) {
				console.info('ProjectBlocker: Developer Mode ON.');
			}
			else if ( type == 2 ) {
				console.error('ProjectBlocker ERROR: localStorage NOT supported - Developer Mode will not persist on navigation.');
			}
		}
	};
})(jQuery);
