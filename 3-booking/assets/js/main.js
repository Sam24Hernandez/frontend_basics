$(document).ready(function () {
  "use strict"; // Modo estricto

  // Scroll Up
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#back-top").fadeIn("slow");
    } else {
      $("#back-top").fadeOut("slow");
    }
  });

  $("#back-top a").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  // Navbar Collapse
  var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  navbarCollapse();
  $(window).scroll(navbarCollapse);
});
