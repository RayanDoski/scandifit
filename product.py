from flask import Blueprint
from recentioner import recension

product = Blueprint('product', __name__)

@product.route("/multivitamin")
def products():
    # Visar recention Samtidigt Som Du Visar Sidan
    return recension('product-page.html', 1)