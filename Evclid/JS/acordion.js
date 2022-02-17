$(".accordion").ready(function() {
  $(".questions__item").click(function(event) {
    if ($(".questions__item").hasClass("questions__item_active")) {
      $(".questions__item").not($(this)).removeClass("questions__item_active");
      $(".questions__item-heading").not($(this).children().find(".questions__item-heading")).removeClass("questions__item-heading_active");
      $(".questions__text").not($(this).children().find(".questions__text")).slideUp(300);
      $(".questions__uncover").not($(this).children(".questions__uncover")).removeClass("questions__uncover_active");
    }

    $(this).toggleClass("questions__item_active");
    $(this).children().find(".questions__item-heading").toggleClass('questions__item-heading_active');
    $(this).children().find(".questions__text").slideToggle(300);
    $(this).children(".questions__uncover").toggleClass("questions__uncover_active");
  });
});
