document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".how-work__button").forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      document.querySelectorAll(".how-work__button").forEach(function(content) {
        content.classList.remove("how-work__button_active");
      })

      event.target.classList.add("how-work__button_active");

      const path = event.currentTarget.dataset.path;

      document.querySelectorAll(".how-work__bottom").forEach(function(content) {
        content.classList.remove("how-work__bottom-is-active");
      });

      document.querySelector(`[data-target="${path}"]`).classList.add("how-work__bottom-is-active");
    });
  });
});
