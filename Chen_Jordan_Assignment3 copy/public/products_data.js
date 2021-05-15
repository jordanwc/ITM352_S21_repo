/*Author: Jordan Chen 
-Assignment 2 file for the products*/

//Products arrays
var allproducts = {

    "Playstation": [
        {
            "name": "PS5",
            "price": 500.00,
            "image": "PS5.jpg"
        },



        {
            "name": "PS4",
            "price": 400.00,
            "image": "PS4.jpg"
        }

    ],
    "Xbox": [

        {
            "name": "Xbox Series X",
            "price": 500.00,
            "image": "XboxX.jpg"
        },

        {
            "name": "Xbox 360",
            "price": 400.00,
            "image": "Xbox360.jpg"

        }


    ],
    "Nintendo": [

        {
            "name": "Nintendo Switch",
            "price": 300.00,
            "image": "Switch.jpg"

        }
    ]
}
if (typeof module != "undefined") {
    module.exports.allproducts = allproducts;
}
