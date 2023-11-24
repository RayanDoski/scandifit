//show animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // else {
        //     entry.target.classList.remove('show')
        // }
    })
}) 

const hiddenelement = document.querySelectorAll('#slide-in')
hiddenelement.forEach((el) => observer.observe(el))

//For Menu
let menu_background = document.querySelector('#menu-background') 
let menu_container = document.querySelector('#menu')
let close_menu_btn = document.querySelector('#close_menu')
let hamburger_menu = document.querySelector('#hamburger-menu')

hamburger_menu.addEventListener('click', function() {
    if (menu_background.classList.contains('show')) {
        menu_background.classList.remove('show')
        menu_container.classList.remove('show')
    } else {
        menu_background.classList.add('show')
        menu_container.classList.add('show')
    }
})

close_menu_btn.addEventListener('click', function() {
    menu_background.classList.remove('show')
    menu_container.classList.remove('show')
})

menu_background.addEventListener('click', function() {
    menu_background.classList.remove('show')
    menu_container.classList.remove('show')
})

//For header 
window.addEventListener("scroll", function() {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY;
    const headerHeight = header.offsetHeight;

    if (scrollPosition > headerHeight) {
        header.classList.add('fixed-header');
    } else {
        header.classList.remove('fixed-header');
    }

});

//For Footer Dropdown Menu
let dropdowns = document.querySelectorAll('#dropdown')
let dropdown_icon = document.querySelectorAll('#dropdown-icon')

dropdowns.forEach((dropdown, dropdown_index) => {
    dropdown.addEventListener('click', function() {
        if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show')
            dropdown_icon[dropdown_index].innerText = '+'
        }else {
            dropdown.classList.add('show')
            dropdown_icon[dropdown_index].innerText = '-'
        }
    })
});
//kundvagn 
let open_cart = document.querySelector('#open-cart')
let close_cart = document.querySelector('#close-cart')
let cart_container = document.querySelector('#kundvagn')
let cart_background = document.querySelector('#kundvagn-background')

open_cart.addEventListener('click', function() {
    if (cart_background.classList.contains('show')) {
        cart_background.classList.remove('show')
        cart_container.classList.remove('show')
    } else {
        cart_background.classList.add('show')
        cart_container.classList.add('show')
    }
})

cart_background.addEventListener('click', function() {
    cart_container.classList.remove('show')
    cart_background.classList.remove('show')
})

close_cart.addEventListener('click', function() {
    cart_container.classList.remove('show')
    cart_background.classList.remove('show')
})

//kundvagn functionalities
let quantity = document.querySelectorAll('#quanity')
let amount_per_product = document.querySelectorAll('#amount-per-product')
let amount_per_product_p = document.querySelectorAll('#amount-per-product-p')
let full_price = document.querySelector('#total-amount')
let quantity_more = document.querySelectorAll('.plus')
let quantity_less = document.querySelectorAll('.minus')

quantity_more.forEach((quantity_more_btn, quantity_more_btn_index) => {
    quantity_more_btn.addEventListener('click', function() {
        let current_value = parseInt(quantity[quantity_more_btn_index].value) + 1;
        quantity[quantity_more_btn_index].value = current_value;
        //for value
        amount_per_product_p[quantity_more_btn_index].innerText = amount_per_product[quantity_more_btn_index].innerText * current_value + " SEK";
        full_price.innerText = amount_per_product_p[quantity_more_btn_index].innerText
    });
});

quantity_less.forEach((quantity_less_btn, quantity_less_btn_index) => {
    quantity_less_btn.addEventListener('click', function() {
        let current_value = parseInt(quantity[quantity_less_btn_index].value) - 1;
        if (current_value >= 1) {
            quantity[quantity_less_btn_index].value = current_value;
        }
        //for value
        amount_per_product_p[quantity_less_btn_index].innerText = amount_per_product[quantity_less_btn_index].innerText * current_value + " SEK";
        full_price.innerText = amount_per_product_p[quantity_less_btn_index].innerText
    });
});


