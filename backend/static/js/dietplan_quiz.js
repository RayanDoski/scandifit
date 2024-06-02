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
question_nine = document.querySelector('.question_nine')
question_ten = document.querySelector('.question_ten')
create_dietplan = document.querySelector('.create_dietplan')

question_array = [
    question_one,
    question_two,
    question_three,
    question_four,
    question_five,
    question_six,
    question_seven,
    question_eight,
    question_nine,
    question_ten,
    create_dietplan
]

progress_bar_def(current_question_nr)

// from question one to two
next_question_one_one = document.querySelector('#next_question_one_one')
next_question_one_two = document.querySelector('#next_question_one_two')
next_question_one_three = document.querySelector('#next_question_one_three')
show_questions_def(next_question_one_one, question_two, 1)
show_questions_def(next_question_one_two, question_two, 1)
show_questions_def(next_question_one_three, question_two, 1)

// from question two to three
next_question_two_one = document.querySelector('#man')
next_question_two_two = document.querySelector('#woman')
show_questions_def(next_question_two_one, question_three, 2)
show_questions_def(next_question_two_two, question_three, 2)

// from question three to four
next_question_three = document.querySelector('#next_question_three')
show_questions_def(next_question_three, question_four, 3)

// from question four to five
next_question_four = document.querySelector('#next_question_four')
show_questions_def(next_question_four, question_five, 4)

// from question five to six
next_question_five = document.querySelector('#next_question_five')
show_questions_def(next_question_five, question_six, 5)

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
next_question_seven_six = document.querySelector('#next_question_seven_six')
next_question_seven_seven = document.querySelector('#next_question_seven_seven')
base_it_on_my_trainingplan = document.querySelector('#next_question_seven_eight')
show_questions_def(next_question_seven_one, question_eight, 7)
show_questions_def(next_question_seven_two, question_eight, 7)
show_questions_def(next_question_seven_three, question_eight, 7)
show_questions_def(next_question_seven_four, question_eight, 7)
show_questions_def(next_question_seven_five, question_eight, 7)
show_questions_def(next_question_seven_six, question_eight, 7)
show_questions_def(next_question_seven_seven, question_eight, 7)
show_questions_def(base_it_on_my_trainingplan, question_eight, 7)

// from question eight to nine
next_question_eight_one = document.querySelector('#next_question_eight_one')
next_question_eight_two = document.querySelector('#next_question_eight_two')
next_question_eight_three = document.querySelector('#next_question_eight_three')
next_question_eight_four = document.querySelector('#next_question_eight_four')
next_question_eight_five = document.querySelector('#next_question_eight_five')
next_question_eight_six = document.querySelector('#next_question_eight_six')
show_questions_def(next_question_eight_one, question_nine, 8)
show_questions_def(next_question_eight_two, question_nine, 8)
show_questions_def(next_question_eight_three, question_nine, 8)
show_questions_def(next_question_eight_four, question_nine, 8)
show_questions_def(next_question_eight_five, question_nine, 8)
show_questions_def(next_question_eight_six, question_nine, 8)

// from question nine to ten
next_question_nine_one = document.querySelector('#next_question_nine_one')
next_question_nine_two = document.querySelector('#next_question_nine_two')
next_question_nine_three = document.querySelector('#next_question_nine_three')
show_questions_def(next_question_nine_one, question_ten, 9)
show_questions_def(next_question_nine_two, question_ten, 9)
show_questions_def(next_question_nine_three, question_ten, 9)

// from question ten to eleven
next_question_ten_one = document.querySelector('#next_question_ten_one')
next_question_ten_two = document.querySelector('#next_question_ten_two')
next_question_ten_three = document.querySelector('#next_question_ten_three')
next_question_ten_four = document.querySelector('#next_question_ten_four')
next_question_ten_five = document.querySelector('#next_question_ten_five')
show_questions_def(next_question_ten_one, create_dietplan, 10)
show_questions_def(next_question_ten_two, create_dietplan, 10)
show_questions_def(next_question_ten_three, create_dietplan, 10)
show_questions_def(next_question_ten_four, create_dietplan, 10)
show_questions_def(next_question_ten_five, create_dietplan, 10)

// from question eleven to finish



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
    progress_nr.innerText = `${question_nr}/10`
    width = (question_nr / 10) * 100 + '%'
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

        if (current_question_nr > 10) {
            current_question_nr = 10
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

    if (!document.querySelector('input[name="goal"]:checked')) {
        show_missing_message('Du har missat 0/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="gender"]:checked')) {
        show_missing_message('Du har missat 1/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="age"]').value) {
        show_missing_message('Du har missat 2/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="height"]').value) {
        show_missing_message('Du har missat 3/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="currentweight"]').value) {
        show_missing_message('Du har missat 4/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="targetweight"]').value) {
        show_missing_message('Du har missat 4/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="physically_demanding_everyday_life"]:checked')) {
        show_missing_message('Du har missat 5/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="training_sessions_per_week"]:checked')) {
        show_missing_message('Du har missat 6/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="current_daily_water_intake"]:checked')) {
        show_missing_message('Du har missat 7/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="dietary_preferences"]:checked')) {
        show_missing_message('Du har missat 8/10', 'alla fält måste fyllas i för att du ska få din kostplan')

    } else if (!document.querySelector('input[name="sugar_intake"]:checked')) {
        show_missing_message('Du har missat 9/10', 'alla fält måste fyllas i för att du ska få din kostplan')

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
    error_text_p.innerText = 'Om du har specifika näringsmässiga behov eller hälsoproblem relaterade till kosten, rekommenderas det att du söker råd från en kvalificerad dietist eller nutritionist för skräddarsydd vägledning och stöd. Du är välkommen att kontakta oss via e-post om du har några frågor eller behöver ytterligare hjälp med din kost: kontakta@scandifit.se'
}

setTimeout(show_warning_message, 10000);