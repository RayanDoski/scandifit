din_info_background = document.querySelector('.din-information-background')
din_info_container = document.querySelector('.din-information-popup')
din_info_btn = document.querySelector('#din-information-btn')

din_info_btn.addEventListener('click', function () {
    din_info_background.classList.add('show')
    din_info_container.classList.add('show')
})

din_info_background.addEventListener('click', function () {
    din_info_background.classList.remove('show')
    din_info_container.classList.remove('show')
})