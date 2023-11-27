let one = document.querySelector('.one')
let two = document.querySelector('.two')
let three = document.querySelector('.three')
let four = document.querySelector('.four')
let five = document.querySelector('.five')
let six = document.querySelector('.six')
let seven = document.querySelector('.seven')
let eight = document.querySelector('.eight')
let nine = document.querySelector('.nine')
let ten = document.querySelector('.ten')
let eleven = document.querySelector('.eleven')

let slide_count = 0;
let progress_bar = document.querySelector('#progress-bar')
let progress_count = document.querySelector('#progress-count')

function slide_nr() {
    const slides = [
        one, two, three, four, five, six, seven, eight, nine, ten, eleven
    ];

    if (slide_count < 0) {
        slide_count = 0;
    } else if (slide_count >= slides.length) {
        slide_count = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        if (i === slide_count) {
            slides[i].classList.add('show');
        } else {
            slides[i].classList.remove('show');
        }
    }

    const progressPercentage = (slide_count / (slides.length - 1)) * 100;
    progress_bar.style.width = `${progressPercentage}%`;
    progress_count.innerText = `${slide_count + 1}/${slides.length}`;
}

slide_nr();


//forward, backwards btns
document.querySelector('#go-forward').addEventListener('click', function() {
    slide_count++
    slide_nr()
})

document.querySelector('#go-backwards').addEventListener('click', function() {
    slide_count--
    slide_nr()
})

function box_clicks(selection, count) {
    selection.forEach((select, select_index) => {
        select.addEventListener('click', function (event) {
    
            selection.forEach((box) => {
                box.style.border = 'none';
            });
    
            slide_count = count
            select.style.border = '5px solid #50C878'
            slide_nr()
        })
    });
}

//first
let age = document.querySelectorAll('#ages')
box_clicks(age, 1);

//second
let goal = document.querySelectorAll('#goal')
box_clicks(goal, 2);

//third
let din_kroppstyp = document.querySelectorAll('#din-kroppstyp')
box_clicks(din_kroppstyp, 3);

//four
let problem_area = document.querySelectorAll('#problem-area')
box_clicks(problem_area, 4);

//five
let height = document.querySelector('#height-vidare')
height.addEventListener('click', function (event) {
    slide_count = 5
    slide_nr()
})

//six
let weight = document.querySelector('#weight-vidare')
weight.addEventListener('click', function (event) {
    slide_count = 6
    slide_nr()
})

//seven
let antal_gng_per_vecka = document.querySelectorAll('#antal-gng-per-vecka')
box_clicks(antal_gng_per_vecka, 7)

//eight
let foljande_tillstand = document.querySelectorAll('#foljande-tillstand')
box_clicks(foljande_tillstand, 8)

//nine
let training_place = document.querySelectorAll('#training-place')
box_clicks(training_place, 9)

//ten
let utrustning = document.querySelectorAll('#utrustning')
box_clicks(utrustning, 10)

// form validation
document.getElementById('form-quiz').addEventListener('submit', function(event) {
    // Prevent the form from being submitted by default
    event.preventDefault();

    let form_validation_age = getSelectedValue('.age');
    let form_validation_goal = getSelectedValue('.radio-goals');
    let form_validation_din_kroppstyp = getSelectedValue('.radio-din-kroppstyp');
    let form_validation_problem_area = getSelectedValue('.radio-problem-area');
    let from_validation_height = document.querySelector('#height').value;
    let form_validation_vikt = document.querySelector('#vikt').value;
    let form_validation_malvikt = document.querySelector('#malvikt').value;
    let form_validation_antal_gng = getSelectedValue('.antal-gng-per-vecka');
    let form_validation_foljande_tillstand = getSelectedValue('.foljande-tillstand');
    let form_validation_home_or_gym = getSelectedValue('.home-or-gym');
    let form_validation_utrustning = getSelectedValue('.utrustning');
    let form_validation_namn = document.querySelector('#name').value;
    let form_validation_email = document.querySelector('#email').value;
    let form_validation_pass = document.querySelector('#pass').value;

    // Validation logic
    if (form_validation_age === '') {
        alert('Ålder krävs (1)');
    } else if (form_validation_goal === '') {
        alert('Mål sättning Krävs (2)');
    } else if (form_validation_din_kroppstyp === '') {
        alert('Kropstyp Krävs (3)');
    } else if (form_validation_problem_area === '') {
        alert('Problemområde Krävs (4)');
    } else if (from_validation_height === '') {
        alert('Längd Krävs (5)');
    } else if (form_validation_vikt === '') {
        alert('Vikt Krävs (6)');
    } else if (form_validation_malvikt === '') {
        alert('Målvikt Krävs (7)');
    } else if (form_validation_antal_gng === '') {
        alert('Antal gånger Per vecka Krävs (8)');
    } else if (form_validation_foljande_tillstand === '') {
        alert('Dina Tillstånd Krävs (9)');
    } else if (form_validation_home_or_gym === '') {
        alert('Plats för Träning Krävs (10)');
    } else if (form_validation_utrustning === '') {
        alert('Utrustnings tillgång Krävs (11)');
    } else if (form_validation_namn === '') {
        alert('Namn Krävs (12)');
    } else if (form_validation_email === '') {
        alert('Email Krävs (13)');
    } else if (form_validation_pass === '') {
        alert('Lösenord Krävs (14)');
    } else {
        // Form is valid, you can submit it
        this.submit();
    }

    function getSelectedValue(className) {
        const selected = document.querySelector(`input[type=radio]${className}:checked`);
        return selected ? selected.value : '';
    }
});
