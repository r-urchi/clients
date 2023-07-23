$(document).ready(function() {
  const firstNameInput = $("#nombre");
  const lastNameInput = $("#apellido");
  const ageInput = $("#edad");
  const birthdayInput = $("#fecha_nacimiento");
  const error = $(".form__error");
  const success = $(".form__success");

  const saveData = (firstName, lastName, age, birthday) => {
    db.collection("clientes")
      .add({
        firstName,
        lastName,
        age,
        birthday,
      })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const cleanForm = () => {
    firstNameInput.val("");
    lastNameInput.val("");
    ageInput.val("");
    birthdayInput.val("");
  };

  const checkForm = (event) => {
    event?.preventDefault();

    const firstName = firstNameInput?.val()?.trim();
    const lastName = lastNameInput?.val()?.trim();
    const age = ageInput?.val()?.trim();
    const birthday = birthdayInput?.val()?.trim();

    const regex = /^([a-zA-ZáéíóúüÁÉÍÓÚÜñÑ]{2,60}[\,\-\.]{0,1}[\s]{0,1}){1,3}$/;

    if (!firstName?.match(regex)) {
      error.html("Ingresa un nombre válido");
      error?.addClass("error");
      return;
    } else {
      error?.removeClass("error");
    }

    if (!lastName?.match(regex)) {
      error.html("Ingresa un apellido válido");
      error?.addClass("error");
      return;
    } else {
      error?.removeClass("error");
    }

    if (age?.trim() === "" || isNaN(age) || age < 1 || age > 120) {
      error.html("Ingresa una edad válida");
      error?.addClass("error");
      return;
    } else {
      error?.removeClass("error");
    }

    const birthDate = new Date(birthday);
    const actualDate = new Date();
    if (birthDate >= actualDate) {
      error.html("Ingresa una fecha de nacimiento válida");
      error?.addClass("error");
      return;
    } else {
      error?.removeClass("error");
    }

    saveData(firstName, lastName, age, birthday);
    success?.addClass("success");
    cleanForm();
  };

  const form = $(".form__form");
  form?.submit(checkForm);
});
