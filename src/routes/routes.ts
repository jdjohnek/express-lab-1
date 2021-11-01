// require the express module
import express from "express";

import cartItem from "../models/cart-item";

import AddItem from "../models/add-item";

// create a new Router object
const routes = express.Router();


// Start your server out with a hard-coded array of cart items, 
// each including id, product, price, and quantity.
const cart: cartItem[] = [
  {
    product: "Football",
    id: 1,
    price: 10,
    quantity: 1,
  },
  {
    product: "Baseball",
    id: 2,
    price: 2,
    quantity: 10,
  },
];

let nextId = 3;


routes.get("/", (req, res) => {
    let filteredCart = cart;
    if(req.query.maxPrice){
        filteredCart = filteredCart.filter((item) => {
            return item.price <= parseFloat(req.query.maxPrice as string)
        })
    }

    if(req.query.prefix){
        filteredCart = filteredCart.filter((item) => {
            return item.product.toLowerCase().startsWith((req.query.prefix as string).toLowerCase())
        })
    }

    if(req.query.pageSize){
        filteredCart = filteredCart.slice(0, parseInt(req.query.pageSize as string))

        // filteredCart = filteredCart.filter((item) => {
    
        //     return item.find(req.query.pageSize as string).slice(0, 10)
        // })
    }

    res.json(filteredCart) // returns data back to browser
});

routes.get("/:id", (req, res) => {
    console.log(req.params.id)
    // to do: get item where id matches req.params 
   let findCart = cart;

    if(req.params.id) {
       let found =  findCart.find((item) => {
            return item.id === parseFloat(req.params.id as string)
        })
        if(found != undefined){
            res.json(found)
        }else {
            res.status(404).send({ message: 'ID NOT FOUND' });
        }
        
    }
   
    res.status(200).json();
  
});

routes.post("/", (req, res) => {
  const addItem = new AddItem(
      nextId,
      req.body.product,
      req.body.price,
      req.body.quantity
  );
    cart.push(addItem);
    nextId++;
    res.json(addItem);

});

export default routes;
