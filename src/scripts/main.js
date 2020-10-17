// import check from './modules/test';

window.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector('form');
  const username = document.querySelector('#username');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phonenumber');
  const password = document.querySelector('#password');
  const password2 = document.querySelector('#password2');
  const formControl = document.querySelectorAll('.form-control');
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const passwordValue = password.value.trim();
  const passwor2dValue = password2.value.trim();
  const button = document.querySelector('.button');



  function inputListenner() {
    username.addEventListener('input', () => {
      if (username.value === "" && username.value.length < 4) {
        username.parentElement.dataset.status = 'false';
        setErrorFor(username, 'Please fill your Name more than 4 symbols');
      } else {
        setSuccessFor(username);
        username.parentElement.dataset.status = 'true';
        submitButton();
      }
    });
    email.addEventListener('input', () => {
      if (email.value === '') {
        email.parentElement.dataset.status = 'false';
        setErrorFor(email, 'Please fill your Email adress');
      } else if (!isEmail(email.value)) {
        email.parentElement.dataset.status = 'false';
        setErrorFor(email, 'Please fill the valid Email adress');
      }
      else {
        setSuccessFor(email);
        email.parentElement.dataset.status = 'true';
        submitButton();
      }
    });
    phone.addEventListener('input', () => {
      if (phone.value === '') {
        phone.parentElement.dataset.status = 'false';
        setErrorFor(phone, 'Please fill the phone number');
      } else if (!phone.value.match(/\d/g)) {
        phone.parentElement.dataset.status = 'false';
        setErrorFor(phone, 'Please fill only numbers');
      } else {
        setSuccessFor(phone);
        phone.parentElement.dataset.status = 'true';
        submitButton();
      }
    });
    password.addEventListener('input', () => {
      if (password.value === '') {
        password.parentElement.dataset.status = 'false';
        setErrorFor(password, 'Please fill your password');
        password2.setAttribute('disabled', 'true');

      } else if (password.value.length < 8) {
        password.parentElement.dataset.status = 'false';
        setErrorFor(password, 'Please fill mor than 8 characters');
        password2.setAttribute('disabled', "true");
      }  else if (password.value.match(/\s/g)) {
        password.parentElement.dataset.status = 'false';
        setErrorFor(password, 'You can not use space in your Password');
        password2.setAttribute('disabled', "true");
      }
      
      else {
        setSuccessFor(password);
        password.parentElement.dataset.status = 'true';
        password2.removeAttribute('disabled');
        submitButton();
      }
    });
    password2.addEventListener('input', () => {
      if (password2.value === '') {
        password2.parentElement.dataset.status = 'false';
        setErrorFor(password2, 'Please confirm your password');

      } else if (password2.value.replace(/\s/g,'').trim() !== password.value.replace(/\s/g,'').trim()) {
        password2.parentElement.dataset.status = 'false';
        setErrorFor(password2, 'Password does not match');

      } else {
        setSuccessFor(password2);
        password2.parentElement.dataset.status = 'true';
        submitButton();
      }
    });


  }
  inputListenner();



  form.addEventListener('submit', (e) => {
    const message = {
      loading: "Loading.....",
      succes: "Thanks, for for your registartion",
      failure: "Error",
      
    };
    e.preventDefault();

    const statusMesage = document.createElement("div");
    statusMesage.textContent = message.loading;
    statusMesage.style.cssText = `
    display:block;
    margin: 10px auto;
    weidth:40px;
    height:40px;
    font-size: 14px;
    position:absolute;
    text-align:center;
    `;
    form.append(statusMesage);

/* CONVERT FORMDATA TO JSON OBJECT */
    const formData = new FormData(form).entries();
    let jsonObject = {};
    for (const [key,value] of formData){
      jsonObject[key] = value;
    }
    console.log(jsonObject);
    const dataBase = '../../dist/data.json';

   async function postData (url, data){
      const response = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
              "Content-type":'aplication/json'
            }
      });
      if (response.ok) {
        console.log(response.status);
        
        statusMesage.textContent = message.succes;
        form.reset();
        formReset ();
        
        setTimeout(() => {
          statusMesage.remove();
      }, 3000);
        
      }else{
        console.log(response.status);
        statusMesage.textContent = `${message.failure}, ${response.status} Cant connect to server`;
      }
      
    }
    postData(dataBase,jsonObject);

  });


  function submitButton() {
    if (formControl[0].dataset.status === 'true' && formControl[1].dataset.status === 'true' && formControl[2].dataset.status === 'true' && formControl[3].dataset.status === 'true' && formControl[4].dataset.status === 'true') {
      button.removeAttribute('disabled');
    }
  }


  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('.message');
    formControl.querySelector('.check').style.visibility = "hidden";
    formControl.querySelector('.replace').style.visibility = "visible";
    span.style.display = 'block';
    span.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    const span = formControl.querySelector('.message');
    formControl.querySelector('.replace').style.visibility = "hidden";
    formControl.querySelector('.check').style.visibility = "visible";
    formControl.dataset.status = 'true';
    span.style.display = '';
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  function formReset (){
    formControl.forEach(item =>{
      item.dataset.status = 'false';
      button.setAttribute('disabled','disabled');
      item.querySelector('.check').style.visibility = "hidden";
      password2.setAttribute('disabled','disabled');
    });
  }

});


















