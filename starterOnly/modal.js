function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Form
const form = document.forms.reserve;

// DOM Elements
const modalbg = document.querySelector(".bground");
const html = document.querySelector("html");
const confirmModalbg = document.querySelector(".validate");
const registeredbg = document.querySelector(".registered");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const closeConfirmModalBtn = document.querySelectorAll("#close-validate");
const closeRegisteredModalBtn = document.querySelectorAll("#close-registered");
const errors = document.querySelectorAll("#error");
const radios = document.querySelectorAll(".radio");
const checkbox = document.querySelector("#checkbox1");
const checkbox2 = document.querySelector("#checkbox2");
const inputNumber = document.querySelector("#quantity");

let result = [];
let registered = localStorage.getItem('GameOn');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  if ("GameOn" in localStorage) {
    registeredbg.style.display = "block";
    window.scrollTo(0, 0);
    html.style.overflowY = "hidden";
    // console.log("Vous être déjà inscrit !");
  } else {
    modalbg.style.display = "block";
  }
}

// launch confirm modal event
function launchConfirmModal() {
  modalbg.style.display = "none";
  window.scrollTo(0, 0);
  html.style.overflowY = "hidden";
  confirmModalbg.style.display = "block";
  localStorage.setItem('GameOn', 'registered');
  form.reset();
}

// close modal event
closeModalBtn.addEventListener("click", e => { closeModal() });

// close confirm modal event
closeConfirmModalBtn.forEach((btn) => btn.addEventListener("click", closeConfirmModal));

// close registered modal event
closeRegisteredModalBtn.forEach((btn) => btn.addEventListener("click", closeRegisteredModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  console.log('Fenêtre modal fermer !');
};

// close confirm modal event
function closeConfirmModal() {
  html.style.overflowY = "auto";
  confirmModalbg.style.display = "none";
  console.log("Dans 1min votre inscription sera effacer !");
  setTimeout(() => {
    console.log("Inscription effacer !");
    localStorage.removeItem('GameOn');
  }, 60000)
}

// close registered modal event
function closeRegisteredModal() {
  html.style.overflowY = "auto";
  registeredbg.style.display = "none";
}

//function insert in array
Array.prototype.insert = function (index, ...items) {
  this.splice(index, 0, ...items);
};

//functions for errors
function showError(element, message) {
  document.querySelectorAll(element)[0].innerHTML = message;

  result.insert(0, message);

};

function removeError() {
  for (let error of errors) {
    error.innerHTML = '';
  }
  for (let i in result) {
    result.splice(i, 1);
    // console.log(result.splice(i, 1))
  }
};

// event input number
inputNumber.addEventListener("keypress", function (evt) {
  // 0 for null values
  // 8 for backspace 
  // 48-57 for 0-9 numbers
  if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
    showError('.error-quantity', 'Veuillez rentrer un nombre uniquement et pas de lettre.');
    evt.preventDefault();
  }
});

// function validate form
form.onsubmit = function validate(e) {
  let emailValidate = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
  let nameValidate = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
  let nameNumberValidate = /^(?=.*[0-9])/;

  removeError();

  //Empty value
  if (this.first.value === "") {
    showError('.error-first', 'Veuillez rentrer votre prénom.');
  } else {
    let text = this.first.value;
    let length = text.length;
    if (length <= "2") {
      showError('.error-first', 'Veuillez entrer 3 caractères ou plus pour le champ du prénom.');
    } else if (this.first.value.match(nameValidate)) {
      showError('.error-first', 'Votre prénom n\'est pas valide.');
    } else if (this.first.value.match(nameNumberValidate)) {
      showError('.error-first', 'Votre prénom n\'est pas valide.');
    }
  }

  if (this.last.value === "") {
    showError('.error-last', 'Veuillez rentrer votre nom.');
  } else {
    let text = this.last.value;
    let length = text.length;
    if (length <= "2") {
      showError('.error-first', 'Veuillez entrer 3 caractères ou plus pour le champ du nom.');

    } else if (this.last.value.match(nameValidate)) {
      showError('.error-last', 'Votre nom n\'est pas valide.');
    } else if (this.last.value.match(nameNumberValidate)) {
      showError('.error-last', 'Votre nom n\'est pas valide.');
    }
  }

  if (!this.email.value.match(emailValidate)) {
    showError('.error-email', 'Veuillez rentrer une adresse mail valide.');
  }

  if (this.birthdate.value === "") {
    showError('.error-birthdate', 'Vous devez entrer votre date de naissance.');
  } else {
    let text = this.birthdate.value;
    let strg = text.substr(0, 4);
    let currentYear = new Date().getFullYear();
    if (strg >= currentYear || strg < "1900") {
      showError('.error-birthdate', 'Veuillez rentrer une date de naissance valide.');
    }
  }

  if (this.quantity.value === "") {
    showError('.error-quantity', 'Veuillez rentrer un nombre valide.');
  }

  // Empty radio button
  if (radios[0].checked === false && radios[1].checked === false && radios[1].checked === false && radios[2].checked === false && radios[3].checked === false && radios[4].checked === false && radios[5].checked === false) {
    showError('.error-radio', 'Vous devez choisir une option.');
  }

  // Empty checkbox
  if (checkbox.checked === false) {
    showError('.error-checkbox1', 'Vous devez acceptez les termes et conditions.');
  }

  // Empty checkbox2
  if (checkbox2.checked === false) {
    console.log("newsletter refusé !");
  } else {
    console.log("newsletter accepté !");
  }

  if (errors[0].innerHTML === "" && errors[1].innerHTML === "" && errors[2].innerHTML === "" && errors[3].innerHTML === "" && errors[4].innerHTML === "" && errors[5].innerHTML === "" && errors[6].innerHTML === "") {
    console.log("Le formulaire ne contien pas d'erreur(s)");
    launchConfirmModal();
  } else {
    console.log("Le formulaire contien des erreur(s)");
  }

  e.preventDefault();
};