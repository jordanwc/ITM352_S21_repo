/*Author: Jordan Chen 
-Assignment 1 file for the products*/

// Product arrays
var products = [
    {
        "name": "PS5",
        "price": 500.00,
        "image": "PS5.jpg"
    },

    {
        "name": "Xbox Series X",
        "price": 500.00,
        "image": "XboxX.jpg"
    },

    {
        "name": "PS4",
        "price": 400.00,
        "image": "PS4.jpg"
    },

    {
        "name": "Xbox 360",
        "price": 400.00,
        "image": "Xbox360.jpg"

    },

    {
        "name": "Nintendo Switch",
        "price": 300.00,
        "image": "Switch.jpg"

    }
]
if (typeof module != "undefined") {
    module.exports.products = products;
}
