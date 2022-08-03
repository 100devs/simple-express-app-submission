(function($) {

	var	$window = $(window),
		$document = $(document),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$footer = $('#footer'),
		$panels = $wrapper.children('.panel'),
		$animatedLinks = $('.actions.animated a'),
		$animatedLink = null;

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload-0');

				window.setTimeout(function() {
					$body.removeClass('is-preload-1');
				}, 1500);
			}, 100);
		});

	// Animated links.
		$animatedLinks
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	(href.length > 1 && $panels.filter(href).length == 0))
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					window.location.hash = '';
					window.location.hash = href;

				// Set animated link.
					$animatedLink = $(this);

			});

	// Panels.
		var locked = true;

		// Fix images.
			$panels.each(function() {

				var	$this = $(this),
					$image = $this.children('.image'),
					$img = $image.find('img'),
					position = $img.data('position');

				// Set background.
					$image.css('background-image', 'url(' + $img.attr('src') + ')');

				// Set position (if set).
					if (position)
						$image.css('background-position', position);

				// Hide original.
					$img.hide();

			});

		// Unlock after a delay.
			window.setTimeout(function() {
				locked = false;
			}, 1250);

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $ul,
					delay = 0,
					$panel;

				// Get panel.
					if (window.location.hash && window.location.hash != '#')
						$panel = $(window.location.hash);
					else
						$panel = $panels.first();

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Locked? Bail.
					if (locked)
						return;

				// Lock.
					locked = true;

				// Animated link?
 					if ($animatedLink) {

 						$ul = $animatedLink.parents('ul');

						// Activate.
							$animatedLink.addClass('active');

						// Set delay.
							delay = 250;

					}

				// Delay.
					window.setTimeout(function() {

						// Deactivate all panels.
							$panels.addClass('inactive');

						// Deactivate footer.
							$footer.addClass('inactive');

						// Delay.
							window.setTimeout(function() {

								// Hide all panels.
									$panels.hide();

								// Show target panel.
									$panel.show();

								// Reset scroll.
									$document.scrollTop(0);

								// Delay.
									window.setTimeout(function() {

										// Activate target panel.
											$panel.removeClass('inactive');

										// Animated link?
											if ($animatedLink) {

												// Deactivate.
													$animatedLink.removeClass('active');

												// Clear.
													$animatedLink = null;

											}

										// Unlock.
											locked = false;

										// IE: Refresh.
											$window.triggerHandler('--refresh');

										window.setTimeout(function() {

											// Activate footer.
												$footer.removeClass('inactive');

										}, 250);

									}, 100);

							}, 350);

					}, delay);

			});

		// Initialize.
			(function() {

				var $panel;

				// Get panel.
					if (window.location.hash && window.location.hash != '#')
						$panel = $(window.location.hash);
					else
						$panel = $panels.first();

				// Deactivate + hide all but initial panel.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

			})();

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Layout fixes.
				$window.on('--refresh', function() {

					// Fix min-height/flexbox.
						$wrapper.css('height', 'auto');

						window.setTimeout(function() {

							var h = $wrapper.height(),
								wh = $window.height();

							if (h < wh)
								$wrapper.css('height', '100vh');

						}, 0);

				});

				$window.on('load', function() {
					$window.triggerHandler('--refresh');
				});

			// Disable animated links.
				$('.actions.animated').removeClass('animated');

		}
document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
	const competition = document.querySelector('input').value
	try{
		const response = await fetch(`https://competitor-door-convert.herokuapp.com/api/${competition}`)
		
		const data = await response.json()
		console.log(data)
				
		document.getElementById('competition').innerText = data.competition
		document.getElementById('doorName').innerText = data.waypointStyle
		document.getElementById('speciesAvailable').innerText = data.speciesAvailable
		
		document.getElementById('doorImage').src = data.image
		
	}catch(error){
		console.log(error)
	}
}

})(jQuery);