// testemonials
let testimony_slide_index = 1;

let testimonial_box = document.querySelectorAll('#testimonial-box')
let testimonial_left_btn = document.querySelector('#testimonial-left')
let testimonial_right_btn = document.querySelector('#testimonial-right')
let testimonial_index_light = document.querySelectorAll('#testimonial-index-light')

function btn_light() {
    if (testimony_slide_index == 1) {
        testimonial_index_light[0].style.backgroundColor = '#50C878'
        testimonial_index_light[1].style.backgroundColor = '#333'
        testimonial_box[0].classList.add('visa')
        testimonial_box[1].classList.add('visa')
        testimonial_box[2].classList.add('visa')
        testimonial_box[3].classList.remove('visa')
        testimonial_box[4].classList.remove('visa')
        testimonial_box[5].classList.remove('visa')
    } else {
        testimonial_index_light[0].style.backgroundColor = '#333'
        testimonial_index_light[1].style.backgroundColor = '#50C878'
        testimonial_box[0].classList.remove('visa')
        testimonial_box[1].classList.remove('visa')
        testimonial_box[2].classList.remove('visa')
        testimonial_box[3].classList.add('visa')
        testimonial_box[4].classList.add('visa')
        testimonial_box[5].classList.add('visa')
    }

    if (testimony_slide_index == 0) {
        testimony_slide_index = 2
        btn_light()
    }
    if (testimony_slide_index == 3) {
        testimony_slide_index = 1
        btn_light()
    }

}

testimonial_left_btn.addEventListener('click', function() {
    testimony_slide_index--
    console.log(testimony_slide_index)
    btn_light()
})

testimonial_right_btn.addEventListener('click', function() {
    testimony_slide_index++
    console.log(testimony_slide_index)
    btn_light()
})

btn_light()
