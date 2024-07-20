let login_btn = document.querySelector('#login-btn')
let register_btn = document.querySelector('#register-btn')

let login_form = document.querySelector('#login-form')
let register_form = document.querySelector('#register-form')

login_btn.addEventListener('click', function() {
    login_form.classList.add('show')
    register_form.classList.remove('show')
    login_btn.classList.add('show')
    register_btn.classList.remove('show')
})

register_btn.addEventListener('click', function() {
    register_form.classList.add('show')
    login_form.classList.remove('show')
    login_btn.classList.remove('show')
    register_btn.classList.add('show')
})