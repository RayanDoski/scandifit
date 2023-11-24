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
    if (slide_count < 0) {
        slide_count = 0
    } else if (slide_count == 0) {
        one.classList.add('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '0%'
        progress_count.innerText = '0/10'
    } else if (slide_count == 1) {
        one.classList.remove('show')
        two.classList.add('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '10%'
        progress_count.innerText = '1/10'
    } else if (slide_count == 2) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.add('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '20%'
        progress_count.innerText = '2/10'
    } else if (slide_count == 3) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.add('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '30%'
        progress_count.innerText = '3/10'
    } else if (slide_count == 4) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.add('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '40%'
        progress_count.innerText = '4/10'
    } else if (slide_count == 5) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.add('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '50%'
        progress_count.innerText = '5/10'
    } else if (slide_count == 7) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.add('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '60%'
        progress_count.innerText = '6/10'
    } else if (slide_count == 8) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.add('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '70%'
        progress_count.innerText = '7/10'
    } else if (slide_count == 9) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.add('show')
        ten.classList.remove('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '80%'
        progress_count.innerText = '8/10'
    } else if (slide_count == 10) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.add('show')
        eleven.classList.remove('show')
        progress_bar.style.width = '90%'
        progress_count.innerText = '9/10'
    } else if (slide_count == 11) {
        one.classList.remove('show')
        two.classList.remove('show')
        three.classList.remove('show')
        four.classList.remove('show')
        five.classList.remove('show')
        six.classList.remove('show')
        seven.classList.remove('show')
        eight.classList.remove('show')
        nine.classList.remove('show')
        ten.classList.remove('show')
        eleven.classList.add('show')
        progress_bar.style.width = '100%'
        progress_count.innerText = '10/10'
    } else if (slide_count > 11) {
        slide_count = 11
    }
}

slide_nr()

//forward, backwards btns
let forward = document.querySelector('#go-forward')
let backwards = document.querySelector('#go-backwards')

forward.addEventListener('click', function() {
    slide_count++
    slide_nr()
})

backwards.addEventListener('click', function() {
    slide_count--
    slide_nr()
})

//first
let age = document.querySelectorAll('#ages')

age.forEach((ages, ages_index) => {
    ages.addEventListener('click', function (event) {

        age.forEach((box) => {
            box.style.border = 'none';
        });

        slide_count = 1
        ages.style.border = '5px solid #50C878'
        slide_nr()
    })
});

//second
let goal = document.querySelectorAll('#goal')

goal.forEach(goals => {
    goals.addEventListener('click', function (event) {

        goal.forEach((box) => {
            box.style.border = 'none';
        });
        
        goals.style.border = '5px solid #50C878'
        slide_count = 2
        slide_nr()
    })
});

//third
let din_kroppstyp = document.querySelectorAll('#din-kroppstyp')

din_kroppstyp.forEach(era_kroppstyper => {
    era_kroppstyper.addEventListener('click', function (event) {

        din_kroppstyp.forEach((box) => {
            box.style.border = 'none';
        });
        
        era_kroppstyper.style.border = '5px solid #50C878'
        slide_count = 3
        slide_nr()
    })
});

//four
let problem_area = document.querySelectorAll('#problem-area')

problem_area.forEach(problem_areas => {
    problem_areas.addEventListener('click', function (event) {

        problem_area.forEach((box) => {
            box.style.border = 'none';
        });
        
        problem_areas.style.border = '5px solid #50C878'
        slide_count = 4
        slide_nr()
    })
});

//five
let height = document.querySelector('#height-vidare')

height.addEventListener('click', function (event) {
    slide_count = 5
    slide_nr()
})

//six
let weight = document.querySelector('#weight-vidare')

weight.addEventListener('click', function (event) {
    slide_count = 7
    slide_nr()
})

//seven
let antal_gng_per_vecka = document.querySelectorAll('#antal-gng-per-vecka')

antal_gng_per_vecka.forEach(a_g_p_v => {
    a_g_p_v.addEventListener('click', function (event) {

        antal_gng_per_vecka.forEach((box) => {
            box.style.border = '1px solid #50C878';
        });
        
        a_g_p_v.style.border = '5px solid #50C878'
        slide_count = 8
        slide_nr()
    })
});

//eight
let foljande_tillstand = document.querySelectorAll('#foljande-tillstand')

foljande_tillstand.forEach(f_t => {
    f_t.addEventListener('click', function (event) {

        foljande_tillstand.forEach((box) => {
            box.style.border = 'none';
        });
        
        f_t.style.border = '5px solid #50C878'
        slide_count = 9
        slide_nr()
    })
});

//nine
let training_place = document.querySelectorAll('#training-place')

training_place.forEach(training_places => {
    training_places.addEventListener('click', function (event) {

        training_place.forEach((box) => {
            box.style.border = 'none';
        });
        
        training_places.style.border = '5px solid #50C878'
        slide_count = 10
        slide_nr()
    })
});

//ten
let utrustning = document.querySelectorAll('#utrustning')

utrustning.forEach(utrustningar => {
    utrustningar.addEventListener('click', function (event) {

        utrustning.forEach((box) => {
            box.style.border = 'none';
        });
        
        utrustningar.style.border = '5px solid #50C878'
        slide_count = 11
        slide_nr()
    })
});

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
