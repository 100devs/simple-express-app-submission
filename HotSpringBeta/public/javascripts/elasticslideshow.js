(function( window, $, undefined ) {
	
	/*
	* smartresize: debounced resize event for jQuery
	*
	* latest version and complete README available on Github:
	* https://github.com/louisremi/jquery.smartresize.js
	*
	* Copyright 2011 @louis_remi
	* Licensed under the MIT license.
	*/

	var $event = $.event, resizeTimeout;

	$event.special.smartresize 	= {
		setup: function() {
			$(this).bind( "resize", $event.special.smartresize.handler );
		},
		teardown: function() {
			$(this).unbind( "resize", $event.special.smartresize.handler );
		},
		handler: function( event, execAsap ) {
			// Save the context
			var context = this,
				args 	= arguments;

			// set correct event type
			event.type = "smartresize";

			if ( resizeTimeout ) { clearTimeout( resizeTimeout ); }
			resizeTimeout = setTimeout(function() {
				jQuery.event.handle.apply( context, args );
			}, execAsap === "execAsap"? 0 : 100 );
		}
	};

	$.fn.smartresize 			= function( fn ) {
		return fn ? this.bind( "smartresize", fn ) : this.trigger( "smartresize", ["execAsap"] );
	};
	
	$.Slideshow 				= function( options, element ) {
	
		this.$el			= $( element );
		
		/***** images ****/
		
		// list of image items
		this.$list			= this.$el.find('ul.ei-slider-large');
		// image items
		this.$imgItems		= this.$list.children('li');
		// total number of items
		this.itemsCount		= this.$imgItems.length;
		// images
		this.$images		= this.$imgItems.find('img:first');
		
		/***** thumbs ****/
		
		// thumbs wrapper
		this.$sliderthumbs	= this.$el.find('ul.ei-slider-thumbs').hide();
		// slider elements
		this.$sliderElems	= this.$sliderthumbs.children('li');
		// sliding div
		this.$sliderElem	= this.$sliderthumbs.children('li.ei-slider-element');
		// thumbs
		this.$thumbs		= this.$sliderElems.not('.ei-slider-element');
		
		// initialize slideshow
		this._init( options );
		
	};
	
	$.Slideshow.defaults 		= {
		// animation types:
		// "sides" : new slides will slide in from left / right
		// "center": new slides will appear in the center
		animation			: 'sides', // sides || center
		// if true the slider will automatically slide, and it will only stop if the user clicks on a thumb
		autoplay			: false,
		// interval for the slideshow
		slideshow_interval	: 3000,
		// speed for the sliding animation
		speed			: 800,
		// easing for the sliding animation
		easing			: '',
		// percentage of speed for the titles animation. Speed will be speed * titlesFactor
		titlesFactor		: 0.60,
		// titles animation speed
		titlespeed			: 800,
		// titles animation easing
		titleeasing			: '',
		// maximum width for the thumbs in pixels
		thumbMaxWidth		: 150
    };
	
	$.Slideshow.prototype 		= {
		_init 				: function( options ) {
			
			this.options 		= $.extend( true, {}, $.Slideshow.defaults, options );
			
			// set the opacity of the title elements and the image items
			this.$imgItems.css( 'opacity', 0 );
			this.$imgItems.find('div.ei-title > *').css( 'opacity', 0 );
			
			// index of current visible slider
			this.current		= 0;
			
			var _self			= this;
			
			// preload images
			// add loading status
			this.$loading		= $('<div class="ei-slider-loading">Loading...</div>').prependTo( _self.$el );
			
			$.when( this._preloadImages() ).done( function() {
				
				// hide loading status
				_self.$loading.hide();
				
				// calculate size and position for each image
				_self._setImagesSize();
				
				// configure thumbs container
				_self._initThumbs();
				
				// show first
				_self.$imgItems.eq( _self.current ).css({
					'opacity' 	: 1,
					'z-index'	: 10
				}).show().find('div.ei-title > *').css( 'opacity', 1 );
				
				// if autoplay is true
				if( _self.options.autoplay ) {
				
					_self._startSlideshow();
				
				}
				
				// initialize the events
				_self._initEvents();
			
			});
			
		},
		_preloadImages		: function() {
			
			// preloads all the large images
			
			var _self	= this,
				loaded	= 0;
			
			return $.Deferred(
			
				function(dfd) {
			
					_self.$images.each( function( i ) {
						
						$('<img/>').load( function() {
						
							if( ++loaded === _self.itemsCount ) {
							
								dfd.resolve();
								
							}
						
						}).attr( 'src', $(this).attr('src') );
					
					});
					
				}
				
			).promise();
			
		},
		_setImagesSize		: function() {
			
			// save ei-slider's width
			this.elWidth	= this.$el.width();
			
			var _self	= this;
			
			this.$images.each( function( i ) {
				
				var $img	= $(this);
					imgDim	= _self._getImageDim( $img.attr('src') );
					
				$img.css({
					width		: imgDim.width,
					height		: imgDim.height,
					marginLeft	: imgDim.left,
					marginTop	: imgDim.top
				});
				
			});
		
		},
		_getImageDim		: function( src ) {
			
			var $img    = new Image();
							
			$img.src    = src;
					
			var c_w		= this.elWidth,
				c_h		= this.$el.height(),
				r_w		= c_h / c_w,
				
				i_w		= $img.width,
				i_h		= $img.height,
				r_i		= i_h / i_w,
				new_w, new_h, new_left, new_top;
					
			if( r_w > r_i ) {
				
				new_h	= c_h;
				new_w	= c_h / r_i;
			
			}
			else {
			
				new_h	= c_w * r_i;
				new_w	= c_w;
			
			}
					
			return {
				width	: new_w,
				height	: new_h,
				left	: ( c_w - new_w ) / 2,
				top		: ( c_h - new_h ) / 2
			};
		
		},
		_initThumbs			: function() {
		
			// set the max-width of the slider elements to the one set in the plugin's options
			// also, the width of each slider element will be 100% / total number of elements
			this.$sliderElems.css({
				'max-width' : this.options.thumbMaxWidth + 'px',
				'width'		: 100 / this.itemsCount + '%'
			});
			
			// set the max-width of the slider and show it
			this.$sliderthumbs.css( 'max-width', this.options.thumbMaxWidth * this.itemsCount + 'px' ).show();
			
		},
		_startSlideshow		: function() {
		
			var _self	= this;
			
			this.slideshow	= setTimeout( function() {
				
				var pos;
				
				( _self.current === _self.itemsCount - 1 ) ? pos = 0 : pos = _self.current + 1;
				
				_self._slideTo( pos );
				
				if( _self.options.autoplay ) {
				
					_self._startSlideshow();
				
				}
			
			}, this.options.slideshow_interval);
		
		},
		// shows the clicked thumb's slide
		_slideTo			: function( pos ) {
			
			// return if clicking the same element or if currently animating
			if( pos === this.current || this.isAnimating )
				return false;
			
			this.isAnimating	= true;
			
			var $currentSlide	= this.$imgItems.eq( this.current ),
				$nextSlide		= this.$imgItems.eq( pos ),
				_self			= this,
				
				preCSS			= {zIndex	: 10},
				animCSS			= {opacity	: 1};
			
			// new slide will slide in from left or right side
			if( this.options.animation === 'sides' ) {
				
				preCSS.left		= ( pos > this.current ) ? -1 * this.elWidth : this.elWidth;
				animCSS.left	= 0;
			
			}	
			
			// titles animation
			$nextSlide.find('div.ei-title > h2')
					  .css( 'margin-right', 50 + 'px' )
					  .stop()
					  .delay( this.options.speed * this.options.titlesFactor )
					  .animate({ marginRight : 0 + 'px', opacity : 1 }, this.options.titlespeed, this.options.titleeasing )
					  .end()
					  .find('div.ei-title > h3')
					  .css( 'margin-right', -50 + 'px' )
					  .stop()
					  .delay( this.options.speed * this.options.titlesFactor )
					  .animate({ marginRight : 0 + 'px', opacity : 1 }, this.options.titlespeed, this.options.titleeasing )
			
			$.when(
				
				// fade out current titles
				$currentSlide.css( 'z-index' , 1 ).find('div.ei-title > *').stop().fadeOut( this.options.speed / 2, function() {
					// reset style
					$(this).show().css( 'opacity', 0 );	
				}),
				
				// animate next slide in
				$nextSlide.css( preCSS ).stop().animate( animCSS, this.options.speed, this.options.easing ),
				
				// "sliding div" moves to new position
				this.$sliderElem.stop().animate({
					left	: this.$thumbs.eq( pos ).position().left
				}, this.options.speed )
				
			).done( function() {
				
				// reset values
				$currentSlide.css( 'opacity' , 0 ).find('div.ei-title > *').css( 'opacity', 0 );
					_self.current	= pos;
					_self.isAnimating		= false;
				
				});
				
		},
		_initEvents			: function() {
			
			var _self	= this;
			
			// window resize
			$(window).on( 'smartresize.eislideshow', function( event ) {
				
				// resize the images
				_self._setImagesSize();
			
				// reset position of thumbs sliding div
				_self.$sliderElem.css( 'left', _self.$thumbs.eq( _self.current ).position().left );
			
			});
			
			// click the thumbs
			this.$thumbs.on( 'click.eislideshow', function( event ) {
				
				if( _self.options.autoplay ) {
				
					clearTimeout( _self.slideshow );
					_self.options.autoplay	= false;
				
				}
				
				var $thumb	= $(this),
					idx		= $thumb.index() - 1; // exclude sliding div
					
				_self._slideTo( idx );
				
				return false;
			
			});
			
		}
	};
	
	var logError 				= function( message ) {
		
		if ( this.console ) {
			
			console.error( message );
			
		}
		
	};
	
	$.fn.eislideshow			= function( options ) {
	
		if ( typeof options === 'string' ) {
		
			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function() {
			
				var instance = $.data( this, 'eislideshow' );
				
				if ( !instance ) {
					logError( "cannot call methods on eislideshow prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for eislideshow instance" );
					return;
				}
				
				instance[ options ].apply( instance, args );
			
			});
		
		} 
		else {
		
			this.each(function() {
			
				var instance = $.data( this, 'eislideshow' );
				if ( !instance ) {
					$.data( this, 'eislideshow', new $.Slideshow( options, this ) );
				}
			
			});
		
		}
		
		return this;
		
	};
	
})( window, jQuery );

            $(function() {
                $('#ei-slider').eislideshow({
					animation			: 'center',
					autoplay			: true,
					slideshow_interval	: 3000,
					titlesFactor		: 0
                });
            });
			
			
/*
 * jQuery Nivo Slider v3.1
 * http://nivo.dev7studios.com
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function(a){var b=function(b,c){var d=a.extend({},a.fn.nivoSlider.defaults,c);var e={currentSlide:0,currentImage:"",totalSlides:0,running:false,paused:false,stop:false,controlNavEl:false};var f=a(b);f.data("nivo:vars",e).addClass("nivoSlider");var g=f.children();g.each(function(){var b=a(this);var c="";if(!b.is("img")){if(b.is("a")){b.addClass("nivo-imageLink");c=b}b=b.find("img:first")}var d=d===0?b.attr("width"):b.width(),f=f===0?b.attr("height"):b.height();if(c!==""){c.css("display","none")}b.css("display","none");e.totalSlides++});if(d.randomStart){d.startSlide=Math.floor(Math.random()*e.totalSlides)}if(d.startSlide>0){if(d.startSlide>=e.totalSlides){d.startSlide=e.totalSlides-1}e.currentSlide=d.startSlide}if(a(g[e.currentSlide]).is("img")){e.currentImage=a(g[e.currentSlide])}else{e.currentImage=a(g[e.currentSlide]).find("img:first")}if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}var h=a('<img class="nivo-main-image" src="#" />');h.attr("src",e.currentImage.attr("src")).show();f.append(h);a(window).resize(function(){f.children("img").width(f.width());h.attr("src",e.currentImage.attr("src"));h.stop().height("auto");a(".nivo-slice").remove();a(".nivo-box").remove()});f.append(a('<div class="nivo-caption"></div>'));var i=function(b){var c=a(".nivo-caption",f);if(e.currentImage.attr("title")!=""&&e.currentImage.attr("title")!=undefined){var d=e.currentImage.attr("title");if(d.substr(0,1)=="#")d=a(d).html();if(c.css("display")=="block"){setTimeout(function(){c.html(d)},b.animSpeed)}else{c.html(d);c.stop().fadeIn(b.animSpeed)}}else{c.stop().fadeOut(b.animSpeed)}};i(d);var j=0;if(!d.manualAdvance&&g.length>1){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}if(d.directionNav){f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">'+d.prevText+'</a><a class="nivo-nextNav">'+d.nextText+"</a></div>");a("a.nivo-prevNav",f).live("click",function(){if(e.running){return false}clearInterval(j);j="";e.currentSlide-=2;o(f,g,d,"prev")});a("a.nivo-nextNav",f).live("click",function(){if(e.running){return false}clearInterval(j);j="";o(f,g,d,"next")})}if(d.controlNav){e.controlNavEl=a('<div class="nivo-controlNav"></div>');f.after(e.controlNavEl);for(var k=0;k<g.length;k++){if(d.controlNavThumbs){e.controlNavEl.addClass("nivo-thumbs-enabled");var l=g.eq(k);if(!l.is("img")){l=l.find("img:first")}if(l.attr("data-thumb"))e.controlNavEl.append('<a class="nivo-control" rel="'+k+'"><img src="'+l.attr("data-thumb")+'" alt="" /></a>')}else{e.controlNavEl.append('<a class="nivo-control" rel="'+k+'">'+(k+1)+"</a>")}}a("a:eq("+e.currentSlide+")",e.controlNavEl).addClass("active");a("a",e.controlNavEl).bind("click",function(){if(e.running)return false;if(a(this).hasClass("active"))return false;clearInterval(j);j="";h.attr("src",e.currentImage.attr("src"));e.currentSlide=a(this).attr("rel")-1;o(f,g,d,"control")})}if(d.pauseOnHover){f.hover(function(){e.paused=true;clearInterval(j);j=""},function(){e.paused=false;if(j===""&&!d.manualAdvance){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}})}f.bind("nivo:animFinished",function(){h.attr("src",e.currentImage.attr("src"));e.running=false;a(g).each(function(){if(a(this).is("a")){a(this).css("display","none")}});if(a(g[e.currentSlide]).is("a")){a(g[e.currentSlide]).css("display","block")}if(j===""&&!e.paused&&!d.manualAdvance){j=setInterval(function(){o(f,g,d,false)},d.pauseTime)}d.afterChange.call(this)});var m=function(b,c,d){if(a(d.currentImage).parent().is("a"))a(d.currentImage).parent().css("display","block");a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility","hidden").show();var e=a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").parent().is("a")?a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").parent().height():a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").height();for(var f=0;f<c.slices;f++){var g=Math.round(b.width()/c.slices);if(f===c.slices-1){b.append(a('<div class="nivo-slice" name="'+f+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block !important; top:0; left:-"+(g+f*g-g)+'px;" /></div>').css({left:g*f+"px",width:b.width()-g*f+"px",height:e+"px",opacity:"0",overflow:"hidden"}))}else{b.append(a('<div class="nivo-slice" name="'+f+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block !important; top:0; left:-"+(g+f*g-g)+'px;" /></div>').css({left:g*f+"px",width:g+"px",height:e+"px",opacity:"0",overflow:"hidden"}))}}a(".nivo-slice",b).height(e);h.stop().animate({height:a(d.currentImage).height()},c.animSpeed)};var n=function(b,c,d){if(a(d.currentImage).parent().is("a"))a(d.currentImage).parent().css("display","block");a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility","hidden").show();var e=Math.round(b.width()/c.boxCols),f=Math.round(a('img[src="'+d.currentImage.attr("src")+'"]',b).not(".nivo-main-image,.nivo-control img").height()/c.boxRows);for(var g=0;g<c.boxRows;g++){for(var i=0;i<c.boxCols;i++){if(i===c.boxCols-1){b.append(a('<div class="nivo-box" name="'+i+'" rel="'+g+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block; top:-"+f*g+"px; left:-"+e*i+'px;" /></div>').css({opacity:0,left:e*i+"px",top:f*g+"px",width:b.width()-e*i+"px"}));a('.nivo-box[name="'+i+'"]',b).height(a('.nivo-box[name="'+i+'"] img',b).height()+"px")}else{b.append(a('<div class="nivo-box" name="'+i+'" rel="'+g+'"><img src="'+d.currentImage.attr("src")+'" style="position:absolute; width:'+b.width()+"px; height:auto; display:block; top:-"+f*g+"px; left:-"+e*i+'px;" /></div>').css({opacity:0,left:e*i+"px",top:f*g+"px",width:e+"px"}));a('.nivo-box[name="'+i+'"]',b).height(a('.nivo-box[name="'+i+'"] img',b).height()+"px")}}}h.stop().animate({height:a(d.currentImage).height()},c.animSpeed)};var o=function(b,c,d,e){var f=b.data("nivo:vars");if(f&&f.currentSlide===f.totalSlides-1){d.lastSlide.call(this)}if((!f||f.stop)&&!e){return false}d.beforeChange.call(this);if(!e){h.attr("src",f.currentImage.attr("src"))}else{if(e==="prev"){h.attr("src",f.currentImage.attr("src"))}if(e==="next"){h.attr("src",f.currentImage.attr("src"))}}f.currentSlide++;if(f.currentSlide===f.totalSlides){f.currentSlide=0;d.slideshowEnd.call(this)}if(f.currentSlide<0){f.currentSlide=f.totalSlides-1}if(a(c[f.currentSlide]).is("img")){f.currentImage=a(c[f.currentSlide])}else{f.currentImage=a(c[f.currentSlide]).find("img:first")}if(d.controlNav){a("a",f.controlNavEl).removeClass("active");a("a:eq("+f.currentSlide+")",f.controlNavEl).addClass("active")}i(d);a(".nivo-slice",b).remove();a(".nivo-box",b).remove();var g=d.effect,j="";if(d.effect==="random"){j=new Array("sliceDownRight","sliceDownLeft","sliceUpRight","sliceUpLeft","sliceUpDown","sliceUpDownLeft","fold","fade","boxRandom","boxRain","boxRainReverse","boxRainGrow","boxRainGrowReverse");g=j[Math.floor(Math.random()*(j.length+1))];if(g===undefined){g="fade"}}if(d.effect.indexOf(",")!==-1){j=d.effect.split(",");g=j[Math.floor(Math.random()*j.length)];if(g===undefined){g="fade"}}if(f.currentImage.attr("data-transition")){g=f.currentImage.attr("data-transition")}f.running=true;var k=0,l=0,o="",q="",r="",s="";if(g==="sliceDown"||g==="sliceDownRight"||g==="sliceDownLeft"){m(b,d,f);k=0;l=0;o=a(".nivo-slice",b);if(g==="sliceDownLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);c.css({top:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="sliceUp"||g==="sliceUpRight"||g==="sliceUpLeft"){m(b,d,f);k=0;l=0;o=a(".nivo-slice",b);if(g==="sliceUpLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);c.css({bottom:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="sliceUpDown"||g==="sliceUpDownRight"||g==="sliceUpDownLeft"){m(b,d,f);k=0;l=0;var t=0;o=a(".nivo-slice",b);if(g==="sliceUpDownLeft"){o=a(".nivo-slice",b)._reverse()}o.each(function(){var c=a(this);if(l===0){c.css("top","0px");l++}else{c.css("bottom","0px");l=0}if(t===d.slices-1){setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1.0"},d.animSpeed)},100+k)}k+=50;t++})}else if(g==="fold"){m(b,d,f);k=0;l=0;a(".nivo-slice",b).each(function(){var c=a(this);var e=c.width();c.css({top:"0px",width:"0px"});if(l===d.slices-1){setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({width:e,opacity:"1.0"},d.animSpeed)},100+k)}k+=50;l++})}else if(g==="fade"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:b.width()+"px"});q.animate({opacity:"1.0"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g==="slideInRight"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:"0px",opacity:"1"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){b.trigger("nivo:animFinished")})}else if(g==="slideInLeft"){m(b,d,f);q=a(".nivo-slice:first",b);q.css({width:"0px",opacity:"1",left:"",right:"0px"});q.animate({width:b.width()+"px"},d.animSpeed*2,"",function(){q.css({left:"0px",right:""});b.trigger("nivo:animFinished")})}else if(g==="boxRandom"){n(b,d,f);r=d.boxCols*d.boxRows;l=0;k=0;s=p(a(".nivo-box",b));s.each(function(){var c=a(this);if(l===r-1){setTimeout(function(){c.animate({opacity:"1"},d.animSpeed,"",function(){b.trigger("nivo:animFinished")})},100+k)}else{setTimeout(function(){c.animate({opacity:"1"},d.animSpeed)},100+k)}k+=20;l++})}else if(g==="boxRain"||g==="boxRainReverse"||g==="boxRainGrow"||g==="boxRainGrowReverse"){n(b,d,f);r=d.boxCols*d.boxRows;l=0;k=0;var u=0;var v=0;var w=[];w[u]=[];s=a(".nivo-box",b);if(g==="boxRainReverse"||g==="boxRainGrowReverse"){s=a(".nivo-box",b)._reverse()}s.each(function(){w[u][v]=a(this);v++;if(v===d.boxCols){u++;v=0;w[u]=[]}});for(var x=0;x<d.boxCols*2;x++){var y=x;for(var z=0;z<d.boxRows;z++){if(y>=0&&y<d.boxCols){(function(c,e,f,h,i){var j=a(w[c][e]);var k=j.width();var l=j.height();if(g==="boxRainGrow"||g==="boxRainGrowReverse"){j.width(0).height(0)}if(h===i-1){setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3,"",function(){b.trigger("nivo:animFinished")})},100+f)}else{setTimeout(function(){j.animate({opacity:"1",width:k,height:l},d.animSpeed/1.3)},100+f)}})(z,y,k,l,r);l++}y--}k+=100}}};var p=function(a){for(var b,c,d=a.length;d;b=parseInt(Math.random()*d,10),c=a[--d],a[d]=a[b],a[b]=c);return a};var q=function(a){if(this.console&&typeof console.log!=="undefined"){console.log(a)}};this.stop=function(){if(!a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=true;q("Stop Slider")}};this.start=function(){if(a(b).data("nivo:vars").stop){a(b).data("nivo:vars").stop=false;q("Start Slider")}};d.afterLoad.call(this);return this};a.fn.nivoSlider=function(c){return this.each(function(d,e){var f=a(this);if(f.data("nivoslider")){return f.data("nivoslider")}var g=new b(this,c);f.data("nivoslider",g)})};a.fn.nivoSlider.defaults={effect:"random",slices:15,boxCols:8,boxRows:4,animSpeed:500,pauseTime:3e3,startSlide:0,directionNav:true,controlNav:true,controlNavThumbs:false,pauseOnHover:true,manualAdvance:false,prevText:"Prev",nextText:"Next",randomStart:false,beforeChange:function(){},afterChange:function(){},slideshowEnd:function(){},lastSlide:function(){},afterLoad:function(){}};a.fn._reverse=[].reverse})(jQuery)
// Call the script //
	$(window).load(function() {
			$('#slider').nivoSlider();
		});