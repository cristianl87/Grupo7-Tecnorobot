const nombre = document.querySelector('#nombre');
const checkNombre = document.querySelector('#checkNombre');
nombre.addEventListener('input', validarNombre);

const email = document.querySelector('#email');
email.addEventListener('input', validarEmail);

const password = document.querySelector('#password');
let passwordValue;
password.addEventListener('input', validarPassword);

const password_confirm = document.querySelector('#password_confirm');
password_confirm.addEventListener('input', validarPasswordConfirm);

function validarNombre(e) {
    const name_feedback = document.querySelector('#name_feedback')
    if(e.target.value.length < 2) {
        name_feedback.style.border = '1px solid #f3878785';
        name_feedback.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i> 
        <p>El nombre debe tener al menos dos caracteres</p>
        `;
        nombre.classList.add('invalid');
        nombre.classList.remove('isValid')
        checkNombre.style.display = 'none'
    } else {
        name_feedback.textContent = '';
        nombre.classList.remove('invalid')
        nombre.classList.add('isValid')
        checkNombre.style.display = 'block';
        name_feedback.style.border = 'none';
    }
}

function validarEmail(e) {

    const email_feedback = document.querySelector('#email_feedback')
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(re.test(e.target.value) == true) {

        const emailValue = e.target.value;
        const checkEmailUrl = 'http://localhost:4000/user/checkUserEmail?email=' + emailValue;

        fetch(checkEmailUrl)
            .then(respuesta => respuesta.json())
            .then(emailFound => {
                if(emailFound === null) {

                    email_feedback.textContent = '';
                    email.classList.remove('invalid')
                    email.classList.add('isValid')
                    checkEmail.style.display = 'block';
                    email_feedback.style.border = 'none';

                } else {

                    email_feedback.style.border = '1px solid #f3878785';
                    email_feedback.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i> 
                    <p>Este correo ya se encuentra registrado</p>
                    `;
                    email.classList.add('invalid');
                    email.classList.remove('isValid');
                    checkEmail.style.display = 'none'
                }
            });        

    } else {

        email_feedback.style.border = '1px solid #f3878785';
        email_feedback.textContent = 'El e-mail no es válido';
        email.classList.add('invalid');
        email.classList.remove('isValid')
        checkEmail.style.display = 'none'
        
    }
}

function validarPassword(e) {
    const password_feedback = document.querySelector('#password_feedback');

    if(e.target.value.length < 8) {

        password_feedback.style.border = '1px solid #f3878785';
        password_feedback.textContent = 'Introduce al menos 8 caracteres';
        password.classList.add('invalid');
        password.classList.remove('isValid')
        checkPassword.style.display = 'none'

    } else {
        password_feedback.textContent = '';
        password.classList.add('isValid');
        password.classList.remove('invalid')
        checkPassword.style.display = 'block';
        password_feedback.style.border = 'none';

        passwordValue = e.target.value;

    }
}

function validarPasswordConfirm(e) {
    const password_confirm_feedback = document.querySelector('#password_confirm_feedback');

    if(e.target.value != passwordValue) {

        password_confirm_feedback.style.border = '1px solid #f3878785';
        password_confirm_feedback.textContent = 'Las contraseñas no coinciden';
        password_confirm.classList.add('invalid');
        password_confirm.classList.remove('isValid')
        checkPasswordConfirm.style.display = 'none'

    } else {
        password_confirm_feedback.textContent = '';
        password_confirm.classList.add('isValid');
        password_confirm.classList.remove('invalid')
        checkPasswordConfirm.style.display = 'block';
        password_confirm_feedback.style.border = 'none';

    }
}