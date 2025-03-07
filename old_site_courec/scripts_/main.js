(function ($) {
  "use strict";
  var header = $(".menu-sticky");
  var win = $(window);
  var headerinnerHeight = $(".header-inner").innerHeight();
  win.on("scroll", function () {
    var scroll = win.scrollTop();
    if (scroll < headerinnerHeight) {
      header.removeClass("sticky");
    } else {
      header.addClass("sticky");
    }
  });
  $(".header-inner").waypoint("sticky", { offset: 0 });
  $(".widget_nav_menu li a")
    .filter(function () {
      return $.trim($(this).html()) == "";
    })
    .hide();
  $(".rs-slider-carousel").slick({
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  });
  $(function () {
    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
      navMain.collapse("hide");
    });
  });
  if ($(".player").length) {
    $(".player").YTPlayer();
  }
  if ($(".pointer-wrap").length) {
    const cursor = cursorDot({
      diameter: parseInt(pointer_data.diameter),
      borderWidth: parseInt(pointer_data.border_width),
      borderColor: String(pointer_data.pointer_border),
      easing: parseInt(pointer_data.speed),
      background: String(pointer_data.pointer_bg),
    });
    cursor.over("a", { scale: parseFloat(pointer_data.scale) });
  }
  $(".menu-area .navbar ul > li.menu-item-has-children").hover(
    function () {
      $(this).addClass("hover-minimize");
    },
    function () {
      $(this).removeClass("hover-minimize");
    }
  );
  $(".showcase-item").hover(function () {
    $(this).toggleClass("hover");
  });
  $(".slider-styles4").slick({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      {
        breakpoint: 400,
        settings: { arrows: false, slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  });
  $(".image-carousel").owlCarousel({
    loop: true,
    items: 1,
    mouseDrag: true,
    dotsContainer: "#item-thumb",
  });
  $(".slider-service-slick").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".slider-nav",
  });
  if ($(".slider-service-slick").length) {
    $(".slider-nav").slick({
      slidesToShow: service3_slider_data.col_lg,
      slidesToScroll: 1,
      asNavFor: ".slider-service-slick",
      dots: false,
      arrows: true,
      mouseDrag: true,
      vertical: true,
      centerMode: true,
      centerPadding: 0,
      focusOnSelect: true,
    });
  }
  $(".phone_call").on("click", function (event) {
    $(".phone_num_call").slideToggle("show");
  });
  $(".sticky_search").on("click", function (event) {
    $(".sticky_form").slideToggle("show");
    $(".sticky_form input").focus();
  });
  $(".sticky_search").on("click", function () {
    $("body").removeClass("search-active").removeClass("search-close");
    if ($(this).hasClass("close-full")) {
      $("body").addClass("search-close");
    } else {
      $("body").addClass("search-active");
    }
    return false;
  });
  $(".nav-link-container").on("click", function (e) {
    $("body.on-offcanvas").removeClass("on-offcanvas");
    setTimeout(function () {
      $("body").addClass("on-offcanvas");
    }, 500);
  });
  if ($(".rs-newsletter").hasClass("rs-newsletters")) {
    $("body").addClass("rs-pages-btm-gap");
  }
  $(".sticky_form_search").on("click", function () {
    $("body, html")
      .removeClass("rs-search-active")
      .removeClass("rs-search-close");
    if ($(this).hasClass("close-search")) {
      $("body, html").addClass("rs-search-close");
    } else {
      $("body, html").addClass("rs-search-active");
    }
    return false;
  });
  if ($("#rs-header").hasClass("fixed-menu")) {
    $("body").addClass("body-left-space");
  }
  $("#rs-header ul > li.classic").hover(
    function () {
      $("body").addClass("mega-classic");
    },
    function () {
      $("body.mega-classic").removeClass("mega-classic");
    }
  );
  if ($(".user-info").hasClass("users-d")) {
    $("body").addClass("profiles");
  }
  if ($(".learn-press-form-login").hasClass("learn-press-form")) {
    $("body").addClass("profiles-login");
  }
  $(document).ready(function () {
    function resizeNav() {
      $(".menu-ofcn").css({ height: window.innerHeight });
      var radius = Math.sqrt(
        Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
      );
      var diameter = radius * 2;
      $(".off-nav-layer").width(diameter);
      $(".off-nav-layer").height(diameter);
      $(".off-nav-layer").css({
        "margin-top": -radius,
        "margin-left": -radius,
      });
    }
    $(".menu-button, .close-button").on("click", function () {
      $(
        ".nav-toggle, .off-nav-layer, .menu-ofcn, .close-button, body"
      ).toggleClass("off-open");
    });
    $(window).resize(resizeNav);
    resizeNav();
  });
  if ($(".page-template-page-single-php .nav").length) {
    $("#single-menu li:first-child, .sidenav li:first-child").addClass(
      "active"
    );
    $("#single-menu a, .sidenav a").on("click", function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        $("#single-menu li, .sidenav li").removeClass("active");
        $(this).parent("li").addClass("active");
        if (target.length) {
          $("html, body").animate(
            { scrollTop: target.offset().top - 70 },
            1000,
            "easeInOutExpo"
          );
          return false;
        }
      }
    });
    var navChildren = $("#single-menu li.menu-item").children("a");
    var aArray = [];
    for (var i = 0; i < navChildren.length; i++) {
      var aChild = navChildren[i];
      var ahref = $(aChild).attr("href");
      aArray.push(ahref);
    }
    $(window).on("scroll", function () {
      var windowPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      for (var i = 0; i < aArray.length; i++) {
        var theID = aArray[i];
        var secPosition = $(theID).offset().top;
        secPosition = secPosition - 100;
        var divHeight = $(theID).height();
        divHeight = divHeight + 10;
        if (windowPos >= secPosition && windowPos < secPosition + divHeight) {
          $("#single-menu a[href='" + theID + "']")
            .parent()
            .addClass("active");
        } else {
          $("#single-menu a[href='" + theID + "']")
            .parent()
            .removeClass("active");
          $(".mobile-menu-container").removeClass("nav-active-menu-container");
        }
      }
    });
  }
  $(".popup-quote").magnificPopup({
    type: "inline",
    preloader: false,
    focus: "#qname",
    removalDelay: 500,
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr("data-effect");
        if ($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = "#qname";
        }
      },
    },
  });
  $(".nav-link-container > a")
    .off("click")
    .on("click", function (event) {
      event.preventDefault();
      $(".nav-link-container").toggleClass("nav-inactive-menu-link-container");
      $(".mobile-menus").toggleClass("nav-active-menu-container");
    });
  $(".nav-close-menu-li > a").on("click", function (event) {
    $(".mobile-menus").toggleClass("nav-active-menu-container");
    $(".content").toggleClass("inactive-body");
  });
  $(
    "body.page-template-page-single .mobile-menu-link > a, body.page-template-page-single .sidenav li.nav-link-container a"
  )
    .off("click")
    .on("click", function (event) {
      event.preventDefault();
      $(".mobile-menu-container").toggleClass(
        "nav-inactive-menu-link-container"
      );
      $(".mobile-menu-container").toggleClass("nav-active-menu-container");
    });
  $(".rs-heading h3").each(function () {
    var elText,
      openSpan = '<span class="first-word">',
      closeSpan = "</span>";
    elText = $(this).text().split(" ");
    elText.unshift(openSpan);
    elText.splice(2, 0, closeSpan);
    elText = elText.join(" ");
    $(this).html(elText);
  });
  $(".latest-news-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    asNavFor: ".latest-news-nav",
  });
  $(".latest-news-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".latest-news-slider",
    dots: false,
    centerMode: false,
    centerPadding: "0",
    focusOnSelect: true,
  });
  $(".team-carousel").each(function () {
    var options = $(this).data("carousel-options");
    $(this).owlCarousel(options);
  });
  $(".partner-carousel").each(function () {
    var options = $(this).data("carousel-options");
    $(this).owlCarousel(options);
  });
  $(".gallery-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    dots: false,
    centerPadding: "228px",
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { centerPadding: "188px" } },
      { breakpoint: 970, settings: { arrows: true, centerPadding: "144px" } },
      { breakpoint: 767, settings: { arrows: true, centerPadding: "0px" } },
      {
        breakpoint: 350,
        settings: {
          arrows: false,
          centerPadding: "0px",
          dots: true,
          slidesToShow: 1,
        },
      },
    ],
  });
  $(".testi-carousel").slick({
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  $(".testi-item  a.tab").on("click", function (e) {
    e.preventDefault();
    slideIndex = $(this).index();
    $(".testi-carousel").slickGoTo(parseInt(slideIndex));
  });
  if ($(".cdev").length) {
    $(".cdev").circlos();
  }
  if ($(".portfolio-carousel").length) {
    $(".portfolio-carousel").owlCarousel({
      loop: true,
      nav: true,
      autoHeight: true,
      items: 1,
    });
  }
  if ($(".portfolio-slider-data").length) {
    var sliderDots = "";
    if (portfolio_data.slider_dots == 1) {
      sliderDots = true;
    }
    var sliderNav = "";
    if (portfolio_data.nav == 1) {
      sliderNav = true;
    }
    $(".portfolio-slider-data").each(function () {
      $(".portfolio-slider-data").slick({
        slidesToShow: portfolio_data.col_lg,
        centerMode: false,
        dots: sliderDots,
        arrows: sliderNav,
        autoplay: portfolio_data.autoplay,
        slidesToScroll: 2,
        centerPadding: "15px",
        autoplaySpeed: portfolio_data.autoplaySpeed,
        pauseOnHover: portfolio_data.pauseOnHover,
        prevArrow:
          "<button type='button' class='slick-prev pull-left'><i class='glyph-icon flaticon-left-arrow' aria-hidden='true'></i></button>",
        nextArrow:
          "<button type='button' class='slick-next pull-right'><i class='glyph-icon flaticon-right-arrow' aria-hidden='true'></i></button>",
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              centerPadding: "15px",
              slidesToShow: portfolio_data.col_lg,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              centerPadding: "15px",
              slidesToShow: portfolio_data.col_md,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              centerPadding: "10px",
              slidesToShow: portfolio_data.col_sm,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerPadding: "5px",
              slidesToShow: portfolio_data.col_xs,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 350,
            settings: {
              centerPadding: "0px",
              slidesToShow: portfolio_data.col_mobile,
              slidesToScroll: 1,
            },
          },
        ],
      });
    });
  }
  $(".blog-carousel").each(function () {
    var options = $(this).data("carousel-options");
    $(this).owlCarousel(options);
  });
  $(function () {
    $("ul.children").addClass("sub-menu");
  });
  $(".rs-products-grid .product-btn .button").addClass(
    "glyph-icon flaticon-shopping-bag"
  );
  $(".popup-videos").magnificPopup({
    disableOn: 10,
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,
  });
  $(".rs-banner .cd-words-wrapper p:first-child").addClass("is-visible");
  $(function () {
    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
      navMain.collapse("hide");
    });
  });
  $(".mptt-shortcode-wrapper .mptt-navigation-select").wrap(
    "<div class='mptt-select'></div>"
  );
  $(".menu-area .navbar ul > li.mega > ul.sub-menu").wrapInner(
    "<div class='container flex-mega'></div>"
  );
  $(".menu-area .navbar ul > li.mega > ul.sub-menu li")
    .first()
    .addClass("first-li-item");
  if ($("div").hasClass("openingfoot")) {
    $("body").addClass("openingfootwrap");
  }
  $(".contents-sticky, .sticky-sidebar").theiaStickySidebar({
    additionalMarginTop: 160,
    additionalMarginBottom: 20,
  });
  var CountTimer = $(".CountDownTimer4");
  if (CountTimer.length) {
    $(".CountDownTimer4").TimeCircles({});
  }
  var CountTimer = $(".CountDownTimer");
  if (CountTimer.length) {
    $(".CountDownTimer").TimeCircles({
      fg_width: 0.03,
      bg_width: 0.8,
      circle_bg_color: "#ffffff",
      circle_fg_color: "#ffffff",
      time: {
        Days: { text: countdown_data.day_text, color: "#fff" },
        Hours: { text: countdown_data.hour_text, color: "#fff" },
        Minutes: { text: countdown_data.sec_text, color: "#fff" },
        Seconds: { text: countdown_data.min_text, color: "#fff" },
      },
    });
  }
  $(window).on("load", function () {
    $("#educavo-load").delay(1000).fadeOut(500);
    $(".educavo-loader").delay(1000).fadeOut(500);
    if ($(window).width() < 992) {
      $(".rs-menu").css("height", "0");
      $(".rs-menu").css("opacity", "0");
      $(".rs-menu").css("z-index", "-1");
      $(".rs-menu-toggle").on("click", function () {
        $(".rs-menu").css("opacity", "1");
        $(".rs-menu").css("z-index", "1");
      });
    }
  });
  $(".image-popup").magnificPopup({
    type: "image",
    callbacks: {
      beforeOpen: function () {
        this.st.image.markup = this.st.image.markup.replace(
          "mfp-figure",
          "mfp-figure animated zoomInDown"
        );
      },
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function (item) {
        return (
          '<div class="gallery-title-wrap"><h3>' +
          item.el.attr("title") +
          "</h3>" +
          "<p>" +
          item.el.attr("caption") +
          "</p></div>"
        );
      },
    },
    gallery: { enabled: true },
  });
  $(".grid").imagesLoaded(function () {
    $(".portfolio-filter").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });
    var $grid = $(".grid").isotope({
      animationOptions: { duration: 750, easing: "linear", queue: false },
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: { columnWidth: ".grid-item" },
    });
  });
  $(".grids").imagesLoaded(function () {
    $(".courses-filter").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grids.isotope({ filter: filterValue });
    });
    var $grids = $(".grids").isotope({
      animationOptions: { duration: 750, easing: "linear", queue: false },
      itemSelector: ".cource-block",
      percentPosition: true,
      masonry: { columnWidth: ".cource-block" },
    });
  });
  $(".courses-filter button").on("click", function (event) {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
  });
  var win = $(window);
  var totop = $("#scrollUp");
  win.on("scroll", function () {
    if (win.scrollTop() > 150) {
      totop.fadeIn();
    } else {
      totop.fadeOut();
    }
  });
  totop.on("click", function () {
    $("html,body").animate({ scrollTop: 0 }, 500);
  });
  $(function () {
    $("ul.children").addClass("sub-menu");
  });
  $(".rs-event-grid.event-slider-style4 .event-item .events-short")
    .last()
    .addClass("none-borders");
  $(".comment-body, .comment-respond").wrap("<div class='comment-full'></div>");
  $(
    "body.single-product div.product .woocommerce-tabs #review_form_wrapper .comment-form-author, body.single-product div.product .woocommerce-tabs #review_form_wrapper .comment-form-email"
  ).wrapAll("<div class='rat-full'></div>");
  if (!String.prototype.getDecimals) {
    String.prototype.getDecimals = function () {
      var num = this,
        match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
      if (!match) {
        return 0;
      }
      return Math.max(
        0,
        (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
      );
    };
  }
  $(document.body).on("click", ".plus, .minus", function () {
    var $qty = $(this).closest(".quantity").find(".qty"),
      currentVal = parseFloat($qty.val()),
      max = parseFloat($qty.attr("max")),
      min = parseFloat($qty.attr("min")),
      step = $qty.attr("step");
    if (!currentVal || currentVal === "" || currentVal === "NaN")
      currentVal = 0;
    if (max === "" || max === "NaN") max = "";
    if (min === "" || min === "NaN") min = 0;
    if (
      step === "any" ||
      step === "" ||
      step === undefined ||
      parseFloat(step) === "NaN"
    )
      step = 1;
    if ($(this).is(".plus")) {
      if (max && currentVal >= max) {
        $qty.val(max);
      } else {
        $qty.val((currentVal + parseFloat(step)).toFixed(step.getDecimals()));
      }
    } else {
      if (min && currentVal <= min) {
        $qty.val(min);
      } else if (currentVal > 0) {
        $qty.val((currentVal - parseFloat(step)).toFixed(step.getDecimals()));
      }
    }
    $qty.trigger("change");
  });
  $(".rs-course-archive-top .course-icons a").on("click", function () {
    $("body").removeClass("rs-grid-view").removeClass("rs-list-view");
    if ($(this).hasClass("rs-list")) {
      $("body").addClass("rs-list-view");
    } else {
      $("body").addClass("rs-grid-view");
    }
    return false;
  });
})(jQuery);
