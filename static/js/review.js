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

// stars review

let stars = document.querySelectorAll('#stars');
let stars_rating = document.querySelector('#stars-rating');

stars.forEach((star, index) => {
    star.addEventListener('click', function() {
        resetStarsColor();
        setStarsColor(index);
        stars_rating.innerText = `Betyg: ${index + 1}/5`;
    });
});

function resetStarsColor() {
    stars.forEach(star => {
        star.style.color = '#333';
    });
}

function setStarsColor(index) {
    for (let i = 0; i <= index; i++) {
        stars[i].style.color = '#50C878';
    }
}


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


