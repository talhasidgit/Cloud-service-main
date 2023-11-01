locoScroll.on('scroll', (position) => {
  if ((position.scroll.y) > 5) {
    document.querySelector('body').classList.add('scrolled');
  } else {
    document.querySelector('body').classList.remove('scrolled');
  }
});

// Modal Pop Up
const modal = document.querySelector('.modal_popup');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



$('.contact-grid input,.contact-grid textarea').on('keyup', function() {
  var charLength = $(this).val().length;
  if (charLength > 0) {
      $(this).siblings('label').addClass('active');
  } else {
      $(this).siblings('label').removeClass('active');
  }
});
        
 
$(".contact-grid input[type=text],.contact-grid input[type=email]").keyup(function() {
  var $this = $(this);
  if ($this.val().length >= 1) {
      $this.parent().removeClass("error");
      $this.parent().addClass("active");
  } else {
      $this.parent().removeClass("active");
      //$this.parent().addClass("error");
  }
});


// Add cta name in input field
function add_fields(ctaname) {
    console.log('hello cta ' +ctaname);
    var d = document.getElementById("add_cta_field");
    var c = ctaname;
    d.innerHTML = '<input name="cta_track" id="cta_track" type="hidden" value="'+c+'">';
}



// Header Mega Menu JS
// $('.tab-link-header').hover(function() {
//   if ($(this).find('a').hasClass('current')) {
//       $(this).find('a').removeClass('current');
//   } else {
//       $(this).find('a').addClass('current');
//   }
// })


// $('.tab-link-header').hover(function() {
//   if ($('.stky_header').hasClass('shrink')) {
//     $('.stky_header').removeClass('shrink');
//   } else {
//     $('.stky_header').addClass('shrink');
//   }
// });

$(document).on('ready', function (e) {

  $(".navbar-toggler").on('click', function (e) {
    $(".offcanvas-collapse").toggleClass('open');
  });

});



$(document).on("click", ".naccs .menu div", function() {
  var numberIndex = $(this).index();
  if (!$(this).is("active")) {
      $(".naccs .menu div").removeClass("active");
      $(".naccs ul li").removeClass("active");
      $(this).addClass("active");
      $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");
  }
});

$('.menu div:not(.engin)').click(function(){
  $('.full-menu-left').removeClass('rem_rght');
})
$('.engin').click(function(){
  $('.full-menu-left').addClass('rem_rght');
})




document.getElementById('scroll-top-btn').addEventListener('click', () => {
  locoScroll.scrollTo(0, 0, 500);
});
