let view_infomation_btn = document.querySelector('#view_information_btn')

let popup_background = document.querySelector('.dietplan_popup_message')
let view_information = document.querySelector('#view_information')

view_infomation_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    view_information.classList.add('show')
})

popup_background.addEventListener('click', function() {
    popup_background.classList.remove('show')
    view_information.classList.remove('show')
})
