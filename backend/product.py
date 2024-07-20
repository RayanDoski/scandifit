from flask import Blueprint
from recentioner import recension, show_specific_reviews

product = Blueprint('product', __name__)

@product.route("/multivitamin")
def product_multivitamin():
    '''
    This function is used to display the multivitamin product page, and the reviews
    '''
    # Visar recention Samtidigt Som Du Visar Sidan
    return recension('product_multivitamin.html', 1, 0)

@product.route("/multivitamin/<show_review>")
def products_specific_review(show_review):
    # Visar Specifk recention Samtidigt Som Du Visar Sidan
    return show_specific_reviews('product_multivitamin.html', 1, show_review)