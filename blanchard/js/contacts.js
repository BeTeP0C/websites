
document.addEventListener("DOMContentLoaded", () => {
  const createTelmask = () => {
    const mask = document.querySelector("#input-tel");
    const im = new Inputmask("+7 (999) 999-99-99")
    im.mask(mask);
  };

  const createValidate = () => {
    const inputs = document.querySelectorAll(".contacts__input");
    const button = document.querySelector(".contacts__button");
    const form = document.querySelector(".contacts__form");


    const validate = new JustValidate('#form', {
        errorFieldCssClass: 'is-invalid',
        errorFieldStyle: {
          border: '1px solid red',
        },
        errorLabelCssClass: 'is-label-invalid',
        errorLabelStyle: {
          color: 'red',
          textDecoration: 'underlined',
        },
        focusInvalidField: true,
        lockForm: true,
    });

    validate
      .addField('#name', [
        {
          rule: 'minLength',
          value: 3,
          errorMessage: "Минимум 3 символа",
        },
        {
          rule: 'maxLength',
          value: 30,
          errorMessage: "Слишком много",
        },
        {
          rule: 'required',
          errorMessage: "Поле пустое",
        },
        {
          validator: (value) => {
            for (let i = 0; i < value.length; i++) {
              if (parseInt(value[i]) ) {
                return false;
              }
            }
            return true;
          },
          errorMessage: "Недопустимый формат",
        },
      ])
      .addField('#input-tel', [
        {
          rule: 'required',
          errorMessage: "Поле пустое",
        },
        {
          validator: (value) => {
            const mask = document.querySelector("#input-tel");
            return !(mask.inputmask.unmaskedvalue().length < 10);
          },
          errorMessage: "Вы не полностью ввели",
        }
      ])
      .onSuccess((event) => {
        let formData = new FormData(event.target);
        console.log("Дфнные из формы", ...formData);

        fetch("mail.php",  {
          method: "POST",
          body: formData,
        })
          .then(() => {
            console.log("Отправлено");
            form.reset();
          })
          .catch(() => console.log("Ошибка"));


        event.target.reset();
      });

      form.addEventListener("submit", () => {
        let counter = 0;
        inputs.forEach(input => {
          if (input.classList.contains("just-validate-success-field")) {
            counter = counter + 1;
          }
        });

        if (counter === 2) {
          inputs.forEach(input => {
            input.classList.remove("just-validate-success-field");
          });
        }
      })
  };

  const createMap = () => {
    ymaps.ready(init);
    function init(){
      const myMap = new ymaps.Map("map", {
          center: [55.759596, 37.616151],
          zoom: 15,
          controls: ['geolocationControl', 'zoomControl'],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      });

      const myPlacemark = new ymaps.Placemark([55.760552, 37.615273], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/1920px/contacts/icon-map.png',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42],
      });
      myMap.geoObjects.add(myPlacemark);
    };
  };

  const changeNameButton = () => {
    const button = document.querySelector(".contacts__button");

    if (document.querySelector(".container").offsetWidth <= 600) {
      button.value = "Заказать";
    }
  };
  createTelmask();
  createValidate();
  createMap();
  changeNameButton();
});
