let to_think_about_btn = document.querySelector('#to_think_about')
let why_btn = document.querySelector("#why_btn")
let benifits_of_sleep_btn = document.querySelector('#benifits_of_sleep_btn')
let disadvantages_of_bad_sleep_btn = document.querySelector('#disadvantages_of_bad_sleep_btn')
let view_infomation_btn = document.querySelector('#view_information_btn')

let popup_background = document.querySelector('.sleeplan_section_popup_message')
let show_to_think_about = document.querySelector('#show_to_think_about')
let show_why_questionmark = document.querySelector('#why_questionmark')
let benifits_of_sleep = document.querySelector('#benifits_of_sleep')
let disadvantages_of_bad_sleep = document.querySelector('#disadvantages_of_bad_sleep')
let view_information = document.querySelector('#view_information')

to_think_about_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    show_to_think_about.classList.add('show')
})

why_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    show_why_questionmark.classList.add('show')
})

benifits_of_sleep_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    benifits_of_sleep.classList.add('show')
})

disadvantages_of_bad_sleep_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    disadvantages_of_bad_sleep.classList.add('show')
})

view_infomation_btn.addEventListener('click', function() {
    popup_background.classList.add('show')
    view_information.classList.add('show')
})

popup_background.addEventListener('click', function() {
    popup_background.classList.remove('show')
    show_to_think_about.classList.remove('show')
    show_why_questionmark.classList.remove('show')
    benifits_of_sleep.classList.remove('show')
    disadvantages_of_bad_sleep.classList.remove('show')
    view_information.classList.remove('show')
})

