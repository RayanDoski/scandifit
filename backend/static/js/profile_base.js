let profile_slide = document.querySelector('#main-slide')
let profile_background_slide = document.querySelector('.backgorund-slide')
let profile_slide_btn = document.querySelector('#open-profile-slide-btn')
let close_button = document.querySelector('#close-slide-btn')

profile_slide_btn.addEventListener('click', function() {
    profile_slide.classList.add('show')
    profile_background_slide.classList.add('show')
})

profile_background_slide.addEventListener('click', function() {
    profile_slide.classList.remove('show')
    profile_background_slide.classList.remove('show')
})

close_button.addEventListener('click', function() {
    profile_slide.classList.remove('show')
    profile_background_slide.classList.remove('show')
})