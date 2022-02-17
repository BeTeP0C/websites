document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".form__agreement_transition").addEventListener("click", () => {
    document.querySelector(".form__agreement").classList.toggle("form__agreement-active");
    console.log("1")
  });
});
