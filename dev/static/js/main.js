// kolbasa scroll

jQuery(document).ready(function($) {
	if ($(window).width() > '1024' && $('.kolbasa').length) {
		let scroll_pos;
		let scrollbar_width = ($(window).width()*0.07) - 10;
		let scroll_elems = $('.kolbasa-part').length;
		let el_pos_start = $('.kolbasa-block').offset().top + $(window).height();
		let el_pos_end = $('.kolbasa-block').offset().top + (($(window).width() - scrollbar_width) * (scroll_elems - 1)) + $(window).height();

		var p = new ScrollMagic.Controller();
		var u = new ScrollMagic.Scene({
			triggerElement: '.kolbasa-block', triggerHook: 0, duration: (($(window).width() - scrollbar_width) * (scroll_elems - 1))
		}).setPin('.kolbasa-block').addTo(p);

		$(window).on('scroll' , function(){
			scroll_pos = $(window).scrollTop() + $(window).height();
			if (scroll_pos > el_pos_start) {
				if (scroll_pos < el_pos_end) {
					$('.kolbasa').css({
						transform: 'translateX(-' + (scroll_pos - el_pos_start) + 'px)'
					});
				}else{
					$('.kolbasa').css({
						transform: 'translateX(-' + (($(window).width() - scrollbar_width) * (scroll_elems - 1)) + $(window).height() + 'px)'
					});
				}
			}else{
				$('.kolbasa').removeAttr('style');
			}
		});
	}
}(jQuery));


// stages-slider

jQuery(document).ready(function($) {
	if ($('.stages-slider').length) {
		let frame = $('.stages-slider-wrap');

		frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			speed: 500,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
		});
	}
}(jQuery));



// simple-slider

jQuery(document).ready(function($) {
	if ($('.simple-slider').length) {
		const slider = $('.simple-slider');

		slider.each(function() {
			$(this).slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
				appendArrows: $(this).parent().find('.slider-nav'),
				prevArrow: '<button class="prev"><i class="ti-angle-left"></i></button>',
				nextArrow: '<button class="next"><i class="ti-angle-right"></i></button>',
			});

		});
	}
}(jQuery));



// post-slider

jQuery(document).ready(function($) {
	if ($('.post-slider').length) {
		const postSlider = $('.post-slider');

		postSlider.slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false,
			arrows: true,
			appendArrows: postSlider.parent().find('.slider-nav'),
			prevArrow: '<button class="prev"><i class="ti-angle-left"></i></button>',
			nextArrow: '<button class="next"><i class="ti-angle-right"></i></button>',
			responsive: [
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 1,
					infinite: true,
				}
			}
			]
		});
	}
}(jQuery));





// menu

jQuery(document).ready(function($) {
	let menu = $('#menu');
	$('.menu-btn').click(function () {
		scrollLock.addScrollableSelector('.menu-wrap');
		scrollLock.disablePageScroll();
		menu.fadeIn('400');
		menu.addClass('active');
	});
	$('.menu-btn--close').click(function () {
		menu.removeClass('active');
		menu.fadeOut('400');
		scrollLock.enablePageScroll();
	});
}(jQuery));




// popups

jQuery(document).ready(function($) {
	let popup_wrap = $('.popup');

	if ($('.popup').length) {

		$('.button--popup').click(function(event) {
			let popupName = $(this).attr('data-popup');
			popupOpen(popupName);
		});
		$('.popup-close').click(function(event) {
			popupClose();
		});

	}

	function popupOpen(popupName) {
		$('#popup-' + popupName + '').fadeIn('100');
		popup_wrap.fadeIn('400');
		scrollLock.addScrollableSelector('.popup');
		scrollLock.disablePageScroll();
	}
	function popupClose() {
		scrollLock.enablePageScroll();
		popup_wrap.fadeOut('300');
		popup_wrap.children('.popup__content').children('div').fadeOut('300');
	}
}(jQuery));




// photoswipe

jQuery(document).ready(function($) {
	var initPhotoSwipeFromDOM = function(gallerySelector) {

		var parseThumbnailElements = function(el) {
			var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item;

			for(var i = 0; i < numNodes; i++) {

				figureEl = thumbElements[i];

				if(figureEl.nodeType !== 1) {
					continue;
				}

				linkEl = figureEl.children[0];

				size = linkEl.getAttribute('data-size').split('x');

				item = {
					src: linkEl.getAttribute('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};



				if(figureEl.children.length > 1) {
					item.title = figureEl.children[1].innerHTML;
				}

				if(linkEl.children.length > 0) {
					item.msrc = linkEl.children[0].getAttribute('src');
				}

				item.el = figureEl;
				items.push(item);
			}

			return items;
		};

		var closest = function closest(el, fn) {
			return el && ( fn(el) ? el : closest(el.parentNode, fn) );
		};

		var onThumbnailsClick = function(e) {
			e = e || window.event;
			e.preventDefault ? e.preventDefault() : e.returnValue = false;

			var eTarget = e.target || e.srcElement;

			var clickedListItem = closest(eTarget, function(el) {
				return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
			});

			if(!clickedListItem) {
				return;
			}

			var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

			for (var i = 0; i < numChildNodes; i++) {
				if(childNodes[i].nodeType !== 1) {
					continue;
				}

				if(childNodes[i] === clickedListItem) {
					index = nodeIndex;
					break;
				}
				nodeIndex++;
			}



			if(index >= 0) {
				openPhotoSwipe( index, clickedGallery );
			}
			return false;
		};

		var photoswipeParseHash = function() {
			var hash = window.location.hash.substring(1),
			params = {};

			if(hash.length < 5) {
				return params;
			}

			var vars = hash.split('&');
			for (var i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}

			if(params.gid) {
				params.gid = parseInt(params.gid, 10);
			}

			return params;
		};

		var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items;

			items = parseThumbnailElements(galleryElement);

			options = {

				galleryUID: galleryElement.getAttribute('data-pswp-uid'),
				bgOpacity: .8,
				getThumbBoundsFn: function(index) {
					var thumbnail = items[index].el.getElementsByTagName('img')[0],
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();

					return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
				}

			};

			if(fromURL) {
				if(options.galleryPIDs) {
					for(var j = 0; j < items.length; j++) {
						if(items[j].pid == index) {
							options.index = j;
							break;
						}
					}
				} else {
					options.index = parseInt(index, 10) - 1;
				}
			} else {
				options.index = parseInt(index, 10);
			}

			if( isNaN(options.index) ) {
				return;
			}

			if(disableAnimation) {
				options.showAnimationDuration = 0;
			}

			gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();
		};

		var galleryElements = document.querySelectorAll( gallerySelector );

		for(var i = 0, l = galleryElements.length; i < l; i++) {
			galleryElements[i].setAttribute('data-pswp-uid', i+1);
			galleryElements[i].onclick = onThumbnailsClick;
		}

		var hashData = photoswipeParseHash();
		if(hashData.pid && hashData.gid) {
			openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
		}
	};

	initPhotoSwipeFromDOM('.lightbox-wrap');
}(jQuery));