// for sub or once clicks 
sub_lable = document.querySelector('#sub-lable')
once_lable = document.querySelector('#once-lable')

// Sub är Chekat först När sidan Laddar
once_or_sub(false, true)

sub_lable.addEventListener('click', function() {
    once_or_sub(false, true)
})

once_lable.addEventListener('click', function() {
    once_or_sub(true, false)
})

function once_or_sub(once, sub) {
    if (once) {
        once_lable.style.border = '1.5px solid #333'
        sub_lable.style.border = '0.5px dotted #333'
    } else if (sub) {
        sub_lable.style.border = '1.5px solid #333'
        once_lable.style.border = '0.5px dotted #333'
    } else {
        alert('Snälla Ladda Om Sidan :)')
    }
}

// dropdown
open_article = document.querySelectorAll('#open-article')
open_dropdown = document.querySelectorAll('#open-dropdown')
dropdown_text = document.querySelectorAll('#show-dropdown-text')
dropdown_btn = document.querySelectorAll('#dropdown-btn')

open_dropdown.forEach((dropdown, index) => {
    dropdown.addEventListener('click', function() {
        if (dropdown_text[index].classList.contains('show')) {
            dropdown_text[index].classList.remove('show');
            dropdown_btn[index].innerText = "+"
            open_article[index].classList.remove('show')
        } else {
            dropdown_text[index].classList.add('show');
            dropdown_btn[index].innerText = "-"
            open_article[index].classList.add('show')
        }
    })
});
