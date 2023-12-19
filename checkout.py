from flask import redirect, Blueprint, session, request

checkout = Blueprint('checkout', __name__)

@checkout.route('/delete-from-cart')
def delete_item():
    item_id = request.args.get('id')

    if 'product-id' in session:
        product_ids = session['product-id']

        if int(item_id) in session['product-id']:
            product_ids.remove(int(item_id))
            session['product-id'] = product_ids

        if not session['product-id']:
            session.pop('product-id')
            return redirect(request.referrer)
        
        return redirect(request.referrer)

@checkout.route('/add-product', methods=['post', 'get'])
def add_product():
    id = request.args.get('id')
    if 'product-id' not in session:
        session['product-id'] = []
    if int(id) not in session['product-id']:
        product_ids = session['product-id']
        product_ids += [int(id)]

        #subscription product and one itme purchase not together
        if 1 in product_ids and 2 in product_ids:
            product_ids.remove(1)

    return redirect(request.referrer)

