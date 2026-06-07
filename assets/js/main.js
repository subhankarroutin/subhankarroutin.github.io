(function ($) {
	"use strict";

	var windowOn = $(window);

	///////////////////////////////////////////////////
	// 01. PreLoader Js
	windowOn.on('load', function () {
		$('#loading').fadeOut(500);
	});

	///////////////////////////////////////////////////
	// 02. SubMenu Dropdown Toggle
	if ($('.tp-main-menu nav > ul > li.has-dropdown > a').length) {
		$('.tp-main-menu nav > ul > li.has-dropdown > a').append('<i class="fal fa-angle-down"></i>');
	}

	///////////////////////////////////////////////////
	// 03. Scroll-to-Top visibility
	windowOn.on('scroll', function () {
		var scroll = windowOn.scrollTop();
		if (scroll < 245) {
			$('.scroll-to-target').removeClass('open');
		} else {
			$('.scroll-to-target').addClass('open');
		}
	});

	///////////////////////////////////////////////////
	// 04. Scroll Up — data-target anchor links only
	// (The .scroll-top button uses native smooth scroll via script.js)
	if ($('.smooth a').length) {
		function smoothScrollTop() {
			$('.smooth a').on('click', function (event) {
				var target = $(this.getAttribute('href'));
				if (target.length) {
					event.preventDefault();
					$('html, body').stop().animate({
						scrollTop: target.offset().top - 100
					}, 1000);
				}
			});
		}
		smoothScrollTop();
	}

	///////////////////////////////////////////////////
	// 05. WOW animation
	var wow = new WOW({ mobile: false });
	wow.init();

	///////////////////////////////////////////////////
	// 06. Sticky Header Js
	function checkSticky() {
		var scroll = windowOn.scrollTop();
		if (scroll < 10) {
			$("#header-sticky,#header-sticky-mobile").removeClass("header-sticky");
		} else {
			$("#header-sticky,#header-sticky-mobile").addClass("header-sticky");
		}
	}
	windowOn.on('scroll', checkSticky);
	$(document).ready(checkSticky);
	windowOn.on('resize', function () { setTimeout(checkSticky, 100); });

	///////////////////////////////////////////////////
	// 07. Mobile Menu — meanmenu (primary, ≤991px)
	if ($('#mobile-menu').length) {
		$('#mobile-menu').meanmenu({
			meanMenuContainer: '.mobile-menu',
			meanScreenWidth: "991",
			meanExpand: ['<i class="fal fa-plus"></i>'],
		});
	}

	// Mobile Menu 2 (≤1199px)
	if ($('#mobile-menu-2').length) {
		$('#mobile-menu-2').meanmenu({
			meanMenuContainer: '.mobile-menu-2',
			meanScreenWidth: "1199",
			meanExpand: ['<i class="fal fa-plus"></i>'],
		});
	}

	///////////////////////////////////////////////////
	// 08. Offcanvas Sidebar
	// Class names must match style.css: .tpoffcanvas.opened / .body-overlay.apply
	$(".tp-menu-bar").on("click", function () {
		$(".tpoffcanvas").addClass("opened");
		$(".body-overlay").addClass("apply");
	});
	$(".close-btn").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});
	$(".body-overlay").on("click", function () {
		$(".tpoffcanvas").removeClass("opened");
		$(".body-overlay").removeClass("apply");
	});

	///////////////////////////////////////////////////
	// 09. Data CSS Js
	$("[data-background]").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});
	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});
	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	///////////////////////////////////////////////////
	// 10. Counter Js
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 10, time: 1000 });
	}

	///////////////////////////////////////////////////
	// 11. Magnific Popup — video
	if ($(".popup-video").length) {
		$(".popup-video").magnificPopup({ type: "iframe" });
	}

	///////////////////////////////////////////////////
	// 12. Magnific Popup — image gallery
	if ($('.popup-image').length) {
		$('.popup-image').magnificPopup({
			type: 'image',
			gallery: { enabled: true }
		});
	}

	///////////////////////////////////////////////////
	// 13. Swiper — Service slider
	if ($('.service-active').length) {
		new Swiper('.service-active', {
			loop: true,
			slidesPerView: 4,
			spaceBetween: 30,
			autoplay: { delay: 2500, disableOnInteraction: true },
			breakpoints: {
				1200: { slidesPerView: 4 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 2 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
			navigation: { nextEl: '.services-n', prevEl: '.services-p' },
		});
	}

	// Swiper — Blog hero
	if ($('.bl-hero__slider-active').length) {
		new Swiper('.bl-hero__slider-active', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			autoplay: { delay: 2500, disableOnInteraction: true },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 1 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
			navigation: { nextEl: '.next-arrow', prevEl: '.prev-arrow' },
		});
	}

	// Swiper — Blog testimonial
	if ($('.bl-testimonial__active').length) {
		new Swiper('.bl-testimonial__active', {
			loop: true,
			slidesPerView: 1,
			effect: 'fade',
			autoplay: { delay: 2500, disableOnInteraction: true },
			pagination: { el: ".testimonial-slider-dots", clickable: true },
		});
	}

	// Swiper — Instagram
	if ($('.bl-instagram__slider-active').length) {
		new Swiper('.bl-instagram__slider-active', {
			loop: true,
			slidesPerView: 6,
			spaceBetween: 30,
			autoplay: { delay: 2500, disableOnInteraction: true },
			breakpoints: {
				1200: { slidesPerView: 6 },
				992:  { slidesPerView: 4 },
				768:  { slidesPerView: 3 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Slick — CTA marquee
	if ($('.bl-cta__slider-active').length) {
		$('.bl-cta__slider-active').slick({
			speed: 12000,
			autoplay: true,
			autoplaySpeed: 0,
			centerMode: true,
			cssEase: 'linear',
			slidesToShow: 1,
			slidesToScroll: 1,
			variableWidth: true,
			infinite: true,
			initialSlide: 1,
			arrows: false,
			buttons: false,
		});
	}

	// Swiper — Corporate brand
	if ($('.corporate-brand__active').length) {
		new Swiper('.corporate-brand__active', {
			loop: true,
			slidesPerView: 6,
			spaceBetween: 30,
			autoplay: { delay: 2500, disableOnInteraction: true },
			breakpoints: {
				1200: { slidesPerView: 5 },
				992:  { slidesPerView: 5 },
				768:  { slidesPerView: 4 },
				576:  { slidesPerView: 3 },
				0:    { slidesPerView: 2 },
			},
		});
	}

	// Swiper — Brand slider
	if ($('.brand-slider-active').length) {
		new Swiper('.brand-slider-active', {
			loop: true,
			slidesPerView: 6,
			spaceBetween: 30,
			autoplay: { delay: 2500, disableOnInteraction: true },
			breakpoints: {
				1200: { slidesPerView: 6 },
				992:  { slidesPerView: 5 },
				768:  { slidesPerView: 4 },
				576:  { slidesPerView: 3 },
				0:    { slidesPerView: 2 },
			},
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
		});
	}

	// Swiper — Testimonial slider
	if ($('.testimonial-slider-active').length) {
		new Swiper('.testimonial-slider-active', {
			loop: true,
			slidesPerView: 3,
			centeredSlides: true,
			spaceBetween: 50,
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 2 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Testimonial slider 2
	if ($('.testimonial-slider-active-2').length) {
		new Swiper('.testimonial-slider-active-2', {
			loop: true,
			slidesPerView: 4,
			spaceBetween: 50,
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 4 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 3 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Testimonial two
	if ($('.testimonial-slider-two').length) {
		new Swiper('.testimonial-slider-two', {
			loop: true,
			slidesPerView: 1,
			pagination: { el: ".testimonial-slider-dots", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
		});
	}

	// Swiper — Testimonial four
	if ($('.testi-slider-active-four').length) {
		new Swiper('.testi-slider-active-four', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 70,
			centeredSlides: true,
			pagination: { el: ".testimonial-slider-dots-four", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 1 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Project detail
	if ($('.testi-slider-pd-active').length) {
		new Swiper('.testi-slider-pd-active', {
			loop: true,
			slidesPerView: 1,
			autoplay: true,
			pagination: { el: ".project-slider-dots", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
		});
	}

	// Swiper — Testimonial five
	if ($('.testi-slider-active-five').length) {
		new Swiper('.testi-slider-active-five', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 20,
			centeredSlides: true,
			pagination: { el: ".testimonial-slider-dots-four", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 1 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Testimonial htm
	if ($('.testimonial-htm-active').length) {
		new Swiper('.testimonial-htm-active', {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 20,
			centeredSlides: true,
			pagination: { el: ".testimonial-slider-dots-four", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
		});
	}

	// Swiper — Project slider three
	if ($('.project-slider-three-active').length) {
		new Swiper('.project-slider-three-active', {
			loop: true,
			slidesPerView: 2,
			spaceBetween: 30,
			pagination: { el: ".project-slider-dots", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 2 },
				992:  { slidesPerView: 2 },
				768:  { slidesPerView: 1 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Product slider
	if ($('.product-slider-active').length) {
		new Swiper('.product-slider-active', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 2 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Project slider
	if ($('.project-slider-active').length) {
		new Swiper('.project-slider-active', {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			pagination: { el: ".my-dots", clickable: true },
			navigation: { nextEl: '.test-n', prevEl: '.test-p' },
			breakpoints: {
				1200: { slidesPerView: 3 },
				992:  { slidesPerView: 3 },
				768:  { slidesPerView: 2 },
				576:  { slidesPerView: 1 },
				0:    { slidesPerView: 1 },
			},
		});
	}

	// Swiper — Blog post slider
	if ($('.blog-post-slider-active').length) {
		new Swiper('.blog-post-slider-active', {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,
			navigation: { nextEl: '.blog-nav-next', prevEl: '.blog-nav-prev' },
		});
	}

	///////////////////////////////////////////////////
	// 14. Slick — Corporate testimonial synced sliders
	if ($('.corporate-testi__slider-avata-active').length) {
		$('.corporate-testi__slider-avata-active').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			fade: false,
			centerMode: true,
			centerPadding: '0',
			asNavFor: '.corporate-testi__slider-active'
		});

		$('.corporate-testi__slider-active').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: '.corporate-testi__slider-avata-active',
			dots: false,
			arrows: false,
			focusOnSelect: true,
			centerPadding: '0',
			responsive: [
				{ breakpoint: 1200, settings: { slidesToShow: 1 } },
				{ breakpoint: 992,  settings: { slidesToShow: 1 } },
				{ breakpoint: 768,  settings: { slidesToShow: 1 } },
				{ breakpoint: 480,  settings: { arrows: false, slidesToShow: 1 } }
			]
		});
	}

	///////////////////////////////////////////////////
	// 15. Isotope grid filter
	if ($('.grid').length) {
		$('.grid').imagesLoaded(function () {
			var $grid = $('.grid').isotope({
				itemSelector: '.grid-item',
				percentPosition: true,
				layoutMode: 'fitRows',
				masonry: { columnWidth: 1 }
			});

			$('.masonary-menu').on('click', 'button', function () {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({ filter: filterValue });
			});

			$('.masonary-menu button').on('click', function (event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});
		});
	}

	///////////////////////////////////////////////////
	// 16. Video play/pause toggle
	if ($('#myVideo').length) {
		var vid = document.getElementById("myVideo");
		var playing = false;
		$('.vid-play-btn').on('click', function () {
			if (!playing) {
				vid.play();
				playing = true;
			} else {
				vid.pause();
				playing = false;
			}
			$(this).toggleClass("open");
		});
	}

})(jQuery);