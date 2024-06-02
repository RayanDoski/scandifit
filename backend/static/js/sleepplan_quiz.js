// global Variables
let current_question_nr = 0

// quetions in order to show them
question_one = document.querySelector('.question_one')
question_two = document.querySelector('.question_two')
question_three = document.querySelector('.question_three')
question_four = document.querySelector('.question_four')
question_five = document.querySelector('.question_five')
question_six = document.querySelector('.question_six')
question_seven = document.querySelector('.question_seven')
question_eight = document.querySelector('.question_eight')
create_sleepplan = document.querySelector('.create_sleepplan')

question_array = [
    question_one,
    question_two,
    question_three,
    question_four,
    question_five,
    question_six,
    question_seven,
    question_eight,
    create_sleepplan
]

progress_bar_def(current_question_nr)

// from question one to two
next_question_one = document.querySelector('#next_question_one')
show_questions_def(next_question_one, question_two, 1)

// from question two to three
next_question_two = document.querySelector('#next_question_two')
show_questions_def(next_question_two, question_three, 2)

// from question three to four
next_question_three = document.querySelector('#next_question_three')
show_questions_def(next_question_three, question_four, 3)

// from question four to five
next_question_four_one = document.querySelector('#next_question_four_one')
next_question_four_two = document.querySelector('#next_question_four_two')
next_question_four_three = document.querySelector('#next_question_four_three')
next_question_four_four = document.querySelector('#next_question_four_four')
next_question_four_five = document.querySelector('#next_question_four_five')
next_question_four_six = document.querySelector('#next_question_four_six')
next_question_four_seven = document.querySelector('#next_question_four_seven')
next_question_four_eight = document.querySelector('#next_question_four_eight')
show_questions_def(next_question_four_one, question_five, 4)
show_questions_def(next_question_four_two, question_five, 4)
show_questions_def(next_question_four_three, question_five, 4)
show_questions_def(next_question_four_four, question_five, 4)
show_questions_def(next_question_four_five, question_five, 4)
show_questions_def(next_question_four_six, question_five, 4)
show_questions_def(next_question_four_seven, question_five, 4)
show_questions_def(next_question_four_eight, question_five, 4)

// from question five to six
next_question_five_one = document.querySelector('#next_question_five_one')
next_question_five_two = document.querySelector('#next_question_five_two')
next_question_five_three = document.querySelector('#next_question_five_three')
next_question_five_four = document.querySelector('#next_question_five_four')
next_question_five_five = document.querySelector('#next_question_five_five')
show_questions_def(next_question_five_one, question_six, 5)
show_questions_def(next_question_five_two, question_six, 5)
show_questions_def(next_question_five_three, question_six, 5)
show_questions_def(next_question_five_four, question_six, 5)
show_questions_def(next_question_five_five, question_six, 5)

// from question six to seven
next_question_six_one = document.querySelector('#next_question_six_one')
next_question_six_two = document.querySelector('#next_question_six_two')
next_question_six_three = document.querySelector('#next_question_six_three')
next_question_six_four = document.querySelector('#next_question_six_four')
show_questions_def(next_question_six_one, question_seven, 6)
show_questions_def(next_question_six_two, question_seven, 6)
show_questions_def(next_question_six_three, question_seven, 6)
show_questions_def(next_question_six_four, question_seven, 6)

// from question seven to eight
next_question_seven_one = document.querySelector('#next_question_seven_one')
next_question_seven_two = document.querySelector('#next_question_seven_two')
next_question_seven_three = document.querySelector('#next_question_seven_three')
next_question_seven_four = document.querySelector('#next_question_seven_four')
next_question_seven_five = document.querySelector('#next_question_seven_five')
show_questions_def(next_question_seven_one, question_eight, 7)
show_questions_def(next_question_seven_two, question_eight, 7)
show_questions_def(next_question_seven_three, question_eight, 7)
show_questions_def(next_question_seven_four, question_eight, 7)
show_questions_def(next_question_seven_five, question_eight, 7)

// from question eight to finish
next_question_eight_one = document.querySelector('#next_question_eight_one')
next_question_eight_two = document.querySelector('#next_question_eight_two')
next_question_eight_three = document.querySelector('#next_question_eight_three')
next_question_eight_four = document.querySelector('#next_question_eight_four')
next_question_eight_five = document.querySelector('#next_question_eight_five')
next_question_eight_six = document.querySelector('#next_question_eight_six')
show_questions_def(next_question_eight_one, create_sleepplan, 8)
show_questions_def(next_question_eight_two, create_sleepplan, 8)
show_questions_def(next_question_eight_three, create_sleepplan, 8)
show_questions_def(next_question_eight_four, create_sleepplan, 8)
show_questions_def(next_question_eight_five, create_sleepplan, 8)
show_questions_def(next_question_eight_six, create_sleepplan, 8)

// Going Forwards And Backwards
progress_back = document.querySelector('#progress_back')
progress_bar_move_back(progress_back)

progress_forward = document.querySelector('#progress_forward')
progress_bar_move_forward(progress_forward)

function show_questions_def(clicked, show_question, question_nr) {
    /**
     * This function changes the question by looking for click and then showing then showing the next 
     * question whilst at the same time using the question_nr to affekt the progress bar. 
     */
    clicked.addEventListener('click', function() {

        // change the progressbar becosue they moved on to the next question
        progress_bar_def(question_nr)

        // Global variable is getting the new slide Value
        current_question_nr = question_nr
        
        // every element is gettign show removed
        question_array.forEach(question => {
            if (question.classList.contains('show')) {
                question.classList.remove('show')
            }
        });

        show_question.classList.add('show')
    })
}

function progress_bar_def(question_nr) {
    /**
     * this function effekts the progressbar, it changes it's values.
     */
    progress_nr = document.querySelector('#progress_nr')
    progress_bar = document.querySelector('#progress_bar')
    progress_nr.innerText = `${question_nr}/8`
    width = (question_nr / 8) * 100 + '%'
    progress_bar.style.width = width
}

function progress_bar_move_back(backwards) {
    /**
     * this function makes everything in quiz move backwards, both the progress_bar and the question
     */
    backwards.addEventListener('click', function() {

        current_question_nr--

        if (current_question_nr < 0) {
            current_question_nr = 0
        }
        
        // change the progressbar becosue they moved on to the next question
        progress_bar_def(current_question_nr)

        // every element is gettign show removed
        question_array.forEach((question, index) => {
            if (current_question_nr === index) {
                question.classList.add('show')
            } else {
                if (question.classList.contains('show')) {
                    question.classList.remove('show')
                }
            }
           
        });

    })
}

function progress_bar_move_forward(forwards) {
    /**
     * this function makes everything in quiz move forward, both the progress_bar and the question
     */
    forwards.addEventListener('click', function() {

        current_question_nr++

        if (current_question_nr > 8) {
            current_question_nr = 8
        }
        
        // change the progressbar becosue they moved on to the next question
        progress_bar_def(current_question_nr)

        // every element is gettign show removed
        question_array.forEach((question, index) => {
            if (current_question_nr === index) {
                question.classList.add('show')
            } else {
                if (question.classList.contains('show')) {
                    question.classList.remove('show')
                }
            }
           
        });

    })
}

// This is the button to the form
submit_form = document.querySelector('#submit_form')

// popup error message values
alert_message_popup = document.querySelector('.alert_message_popup')
error_popup = document.querySelector('.error_popup')

// h2 taggen i error_popup
var error_text_h2 = error_popup.querySelector('div > h2');
var error_text_p = error_popup.querySelector('div > p');


alert_message_popup.addEventListener('click', function() {
    /**
     * This eventlistner takes down the error message when they click anywhere
     */
    if (alert_message_popup.classList.contains('show')) {
        alert_message_popup.classList.remove('show')
        error_popup.classList.remove('show')
    }
})

document.addEventListener('keydown', function(event) {
    /**
     * This eventlistner stops the enter key from validating the form
     */
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

submit_form.addEventListener('click', function(event) {
    /**
     * This eventlistner makes sure that all vlaues are entered before the form gets sent
     * it also shows the user an error message if they missed something
     */
    event.preventDefault();

    wakeuptime = document.querySelector('#wakeuptime').value
    age = document.querySelector('#age').value
    weight = document.querySelector('#weight').value
   
    if (wakeuptime === '') {
        show_missing_message('Du har missat 0/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else if (age === '') {
        show_missing_message('Du har missat 1/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else if (weight === '') {
        show_missing_message('Du har missat 2/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
    
    } else if (!document.querySelector('input[name="time_to_sleep"]:checked')) {
        show_missing_message('Du har missat 3/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else if (!document.querySelector('input[name="daily_mood_and_energy"]:checked')) {
        show_missing_message('Du har missat 4/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else if (!document.querySelector('input[name="caffeine_in_the_afternoon"]:checked')) {
        show_missing_message('Du har missat 5/8', 'alla fält måste fyllas i för att du ska få din sömnplan')

    } else if (!document.querySelector('input[name="how_much_sleep_do_you_get_on_avg"]:checked')) {
        show_missing_message('Du har missat 6/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else if (!document.querySelector('input[name="sleep_disturbances_or_symptoms"]:checked')) {
        show_missing_message('Du har missat 7/8', 'alla fält måste fyllas i för att du ska få din sömnplan')
        
    } else {
        this.form.submit(); 
    }

    function show_missing_message(header, paragraph) {
        alert_message_popup.classList.add('show')
        error_popup.classList.add('show')
        error_text_h2.innerText = header
        error_text_p.innerText = paragraph
    }

})

function show_warning_message() {
    alert_message_popup.classList.add('show')
    error_popup.classList.add('show')
    error_text_h2.innerText = 'Hälsopåminnelse'
    error_text_p.innerText = 'Om du lider av allvarliga sömnproblem, kontakta din närmaste läkare för hjälp.'
}

setTimeout(show_warning_message, 10000);