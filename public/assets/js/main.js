/*
	Transit by Pixelarity
	pixelarity.com | hello@pixelarity.com
	License: pixelarity.com/license
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 5,

			// Slider speed (in ms).
				sliderSpeed: 1000

		};

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
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

		// IE-specific fixes.
			if (browser.name == 'ie'
			||	browser.name == 'edge')
				$body.addClass('is-ie');

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Parallax background.

		// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
			if (browser.name == 'ie'
			||	browser.name == 'edge'
			||	browser.mobile)
				settings.parallax = false;

		if (settings.parallax) {

			var $dummy = $(), $bg;

			$window
				.on('scroll.transit_parallax', function() {

					// Adjust background position.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						$bg.css('background-position', 'top left, center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');

				})
				.on('resize.transit_parallax', function() {

					// If we're in a situation where we need to temporarily disable parallax, do so.
					// Note: If you've removed the background overlay image, remove the "top left, " bit.
						if (breakpoints.active('<=medium')) {

							$body.css('background-position', 'top left, top center');
							$bg = $dummy;

						}

					// Otherwise, continue as normal.
						else
							$bg = $body;

					// Trigger scroll handler.
						$window.triggerHandler('scroll.transit_parallax');

				});

			$window.on('load.transit_parallax', function() {
				setTimeout(function() {
					$window.trigger('resize.transit_parallax');
				}, 0);
			});

		}

	// Slider.
		$('.slider-wrapper').each(function() {

			var $this = $(this),
				$slider = $this.children('.slider'),
				$indicators = $('<div class="indicators" />').appendTo($this),
				$slide = $slider.children(),
				$indicator,
				locked = false,
				i;

			// Indicators.
				for (i=0; i < $slide.length; i++)
					$('<a href="#">' + (i + 1) + '</a>')
						.appendTo($indicators);

				$indicator = $indicators.children('a')
					.each(function(index) {

						var	$this = $(this),
							$target = $slide.eq(index);

						$this.on('click', function(event, initial) {

							var	x;

							// Prevent default.
								event.stopPropagation();
								event.preventDefault();

							// Already selected?
								if ($this.hasClass('active'))
									return;

							// Locked?
								if (locked)
									return;

								locked = true;

							// Calculate scroll position.
								x = ($target.position().left + $slider.scrollLeft()) - (Math.max(0, $slider.width() - $target.outerWidth()) / 2);

							// Scroll.
								$slide.addClass('inactive');
								$indicator.removeClass('active');
								$this.addClass('active');

								if (initial) {

									$slider.scrollLeft(x);
									$target.removeClass('inactive');
									locked = false;

								}
								else {

									$slider
										.stop()
										.animate(
											{ scrollLeft: x },
											settings.sliderSpeed,
											'swing'
										);

									setTimeout(function() {
										$target.removeClass('inactive');
										locked = false;
									}, Math.max(0, settings.sliderSpeed - 250));

								}

						});

					});

			// Slides.
				$slide.on('click', function(event, initial) {

					var $this = $(this);

					$indicator.eq($this.index())
						.trigger('click', initial);

				});

				$slide.on('click', 'a', function(event) {

					if ($(this).parents('article').hasClass('inactive'))
						event.preventDefault();

				});

			// Re-position on resize.
				$window.on('resize.transit_slider', function(event) {

					var $target = $slide.not('.inactive');

					$slider.scrollLeft(($target.position().left + $slider.scrollLeft()) - (Math.max(0, $slider.width() - $target.outerWidth()) / 2));

				});

			// Initialize.
				$slide.filter('.initial')
					.trigger('click', true);

		});

})(jQuery);