import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";


describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2);
        
    });

    it('adds a new product to the cart', () => {
     

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();
        

        addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1);
        
    });
});

    describe('test suite: removeFromCart', () => {
        beforeEach(() => {
            spyOn(localStorage, 'setItem');
        });

        it('removes a product from the cart', () => {
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            });
       
        loadFromStorage();

        removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]))
    });

    it('does nothing if product is not in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        })
        loadFromStorage();

        removeFromCart('does-not-exist');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '1'
        }]))
    });

    
});

    describe('test suite: updateDeliveryOption', () => {
        beforeEach(() => {
            spyOn(localStorage, 'setItem');
        });

        it('update delivery option', () => {
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            });
            loadFromStorage();

            updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', '3');
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
            expect(cart[0].quantity).toEqual(1);
            expect(cart[0].deliveryOptionId).toEqual('3');

            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '3'
            }]));
        });

        it('does nothing if the  product is not in the cart', () => {
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            });
            loadFromStorage();

            updateDeliveryOption('does-not-exist', '3');
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
            expect(cart[0].quantity).toEqual(1);
            expect(cart[0].deliveryOptionId).toEqual('1');
            expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        });

          it('does nothing if the delivery option does not exis ', () => {
            spyOn(localStorage, 'getItem').and.callFake(() => {
                return JSON.stringify([{
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            });
            loadFromStorage();

            updateDeliveryOption('15b6fc6f-327a-4ec4-896f-486349e85a3d', 'does-not-exist');
            expect(cart.length).toEqual(1);
            expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
            expect(cart[0].quantity).toEqual(1);
            expect(cart[0].deliveryOptionId).toEqual('1');
            expect(localStorage.setItem).toHaveBeenCalledTimes(0);
          });
    });