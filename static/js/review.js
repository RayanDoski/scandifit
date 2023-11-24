let review_popup_background = document.querySelector('.popup-review-background')
let review_popup_container = document.querySelector('.section-review-background')
let review_btn = document.querySelector('#write-review-btn')

review_btn.addEventListener('click', function() {
    review_popup_background.classList.add('show')
    review_popup_container.classList.add('show')
})

review_popup_background.addEventListener('click', function() {
    review_popup_background.classList.remove('show')
    review_popup_container.classList.remove('show')
})

// stars review

let stars = document.querySelectorAll('#stars')
let stars_rating = document.querySelector('#stars-rating')

stars[0].style.color = '#50C878'
stars[1].style.color = '#333'
stars[2].style.color = '#333'
stars[3].style.color = '#333'
stars[4].style.color = '#333'

stars[0].addEventListener('click', function() {
    stars[0].style.color = '#50C878'
    stars[1].style.color = '#333'
    stars[2].style.color = '#333'
    stars[3].style.color = '#333'
    stars[4].style.color = '#333'
    stars_rating.innerText = 'Betyg: 1/5'
})
stars[1].addEventListener('click', function() {
    stars[0].style.color = '#50C878'
    stars[1].style.color = '#50C878'
    stars[2].style.color = '#333'
    stars[3].style.color = '#333'
    stars[4].style.color = '#333'
    stars_rating.innerText = 'Betyg: 2/5'
})
stars[2].addEventListener('click', function() {
    stars[0].style.color = '#50C878'
    stars[1].style.color = '#50C878'
    stars[2].style.color = '#50C878'
    stars[3].style.color = '#333'
    stars[4].style.color = '#333'
    stars_rating.innerText = 'Betyg: 3/5'
})
stars[3].addEventListener('click', function() {
    stars[0].style.color = '#50C878'
    stars[1].style.color = '#50C878'
    stars[2].style.color = '#50C878'
    stars[3].style.color = '#50C878'
    stars[4].style.color = '#333'
    stars_rating.innerText = 'Betyg: 4/5'
})
stars[4].addEventListener('click', function() {
    stars[0].style.color = '#50C878'
    stars[1].style.color = '#50C878'
    stars[2].style.color = '#50C878'
    stars[3].style.color = '#50C878'
    stars[4].style.color = '#50C878'
    stars_rating.innerText = 'Betyg: 5/5'
})

// form validation
document.getElementById('form-review').addEventListener('submit', function(event) {
    // Prevent the form from being submitted by default
    event.preventDefault();
  
    let rubrik = document.getElementById('rubrik').value;
    let recention = document.getElementById('recention').value;
    let name = document.getElementById('name').value;
  
    // Validation logic
    if (rubrik === '') {
      alert('rubrik krävs');
    } else if (recention === '') {
      alert('Recention Krävs');
    } else if (name === '') {
        alert('Name Krävs')
    } else {
      // Form is valid, you can submit it
      this.submit();
    }

  });


