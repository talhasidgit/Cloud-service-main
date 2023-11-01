$("document").ready(function(){
    $(".tech_stack_wrap .tech_stack_detail:nth-child(2)").show();
  });
  
  $(".tab_chip span").click(function() {
    $(".tech_stack_detail").hide();
    var activeTab = $(this).attr("rel");
    $("#"+activeTab).show();
    $(".tab_chip").removeClass("active");
    $(this).parent().addClass("active");
  });
  
  
  $('.tab_cont_dtl li').click(function() {
    $('.card_para').hide();
    $(this).parents('.scroll_list').addClass('activescroll');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  
    if ($('.accor_content').is(':visible')) {
        $(".accor_content").slideUp(300);
        $('.card_para').show();
    }
    if ($(this).find(".accor_content").is(':visible')) {
        $(this).find(".accor_content").slideUp(300);
        $(this).parent('.scroll_list').removeClass('activescroll');
    } else {
        $(this).find(".accor_content").slideDown(300);
        $('.card_para').hide();
    }
  });
  $('.serv_card_head').click(function() {
     $(this).parent('.card_accord').find('.para_content').hide();
    $(this).parent('.card_accord').find('.card_para').show();
  });
  
  
  
  
  
  
  $('.tab-link').click(function(){
    var tab_id = $(this).find('span').attr('data-tab');
  
    $(this).siblings('li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#"+tab_id).addClass('current');
    $('.counter').html(tab_id);
  })
  
  
  // scrollTrigger Process Dot Animation
  gsap.registerPlugin(ScrollTrigger);
  
  const locoScroll = new LocomotiveScroll({
   el: document.querySelector("[data-scroll-container]"),
   smooth: true,
   smoothMobile: true
  });
  
  // Locomotive scroll height gets updated according to Dom Height
  new ResizeObserver(() => locoScroll.update()).observe(
    document.querySelector("[data-scroll-container]")
  );
 
  
  // Scroll section inside main scroll container
  var innerScroller = document.getElementById("scroll_list");
  innerScroller.onmouseover = function(event) { locoScroll.stop(); };
  innerScroller.onmouseout = function(event) { locoScroll.start(); };
  
  
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
   scrollTop(value) {
     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
   }, 
   getBoundingClientRect() {
     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
   },
   pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
  });
  
  
  
  
  
  // Accordion starts
  $('.app-faq-wrap-list .head').click(function() {
    $(this).parents('.faq_col').toggleClass('active').siblings('.faq_col').removeClass('active');
    if ($('.faq-content-wrap').is(':visible')) {
        $(".faq-content-wrap").slideUp(300);
    }
    if ($(this).next(".faq-content-wrap").is(':visible')) {
        $(this).next(".faq-content-wrap").slideUp(300);
    } else {
        $(this).next(".faq-content-wrap").slideDown(300);
  
    }
  });
  // Accordion ends
  
  $('.why__choose__panel li').click(function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
  
  
  
  
  const pinTopSec = gsap.timeline({
    scrollTrigger: {
      scroller: "[data-scroll-container]",
      trigger: ".top_content_wrap",
      pin: true,
      scrub: 2,
      pinSpacing: false,
      start: "top 30%",
      end: "bottom -14%",
      markers: false,
      toggleActions: "play complete reverse reset" ,
      ease: "power3.inOut"    
    } 
  });
  
  pinTopSec.to('.top_content_wrap', { top: 50, duration: 1}); 
  // pinTopSec.to('.case_full_banner', { width: "100%", duration: 1},"-=2.2");
  
  
  let sections = gsap.utils.toArray(".panel");
  
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      scroller: "[data-scroll-container]",
      trigger: ".case_scoll_sec",
      pin: true,
      scrub: 1,
      start: "top 135px",
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".case_scoll_sec").offsetWidth
    }
  });
  
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
  // scrollTrigger Process Dot Animation ends
  
  
  
  $("document").ready(function(){
    $(".tab-detail:first").show();
  });
  
  $(".tab-link-wrapper span").click(function() {
    $(".tab-detail").hide();
    $(".tab-detail").removeClass('block');
    var activeTab = $(this).attr("rel");
    $("#"+activeTab).show();
    $("#"+activeTab).addClass('block');
    $(".tab-link-wrapper").removeClass("active");
    $(this).parent().addClass("active");
  });
  
  
  
  // Portfolio section cursor effect
  var $circle = $('.block_bubble');
  function moveCircle(e) {
      TweenLite.to($circle, 0.3, {
      css: {
        left: e.pageX,
        top: e.pageY
      }
    });
  }
  $(window).on('mousemove', moveCircle);
  $(".case_study_panel .common__btn").hover(function () {
    $('.case_study_panel').toggleClass("cursor-btn");
  });
  
      
      $('.tab-link').click(function(){
      $('.card_para').show();
      $('.scroll_list').removeClass('activescroll');
          var tab_id = $(this).find('span').attr('data-tab');
  
          $(this).siblings('li').removeClass('current');
          $('.tab-content').removeClass('current');
          $(this).addClass('current');
          $("#"+tab_id).addClass('current');
      $('.counter').html(tab_id);
      })
  
  // Accordion ends
  
  
  $(document).ready(function() {
    $('.benefit_slides').owlCarousel({
        loop: true,
        items: 1,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        // autoplayHoverPause: true,
    })
  })
  
  $("document").ready(function(){
    $(".tab-detail2:first").show();
  });
  
  $(".tab-link-logo span").click(function() {
    $(".tab-detail2").hide();
    var activeTab = $(this).attr("rel");
    $("#"+activeTab).show();
    $(".tab-link-logo").removeClass("active");
    $(this).parent().addClass("active");
  });
  
  
  $(document).ready(function() {
    $('.tab_chips_wrap').owlCarousel({
        loop: false,
        items: 6,
        nav: false,
        margin:15,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
          1280: {
              items: 4,
          }
      }
    })
  })
  
  
  