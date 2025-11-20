// import express from 'express' ;

// import { addToCart , getCart , updateCartItem , removeFromCart , clearCart } from "../controllers/cart.controller.js" ; 

// const router = express.Router() ; 

// // Guest cart by cartToken
// router.post("/guest/:cartToken/add", addToCart);
// router.get("/guest/:cartToken", getCart);
// router.put("/guest/:cartToken/update/:productId", updateCartItem);
// router.delete("/guest/:cartToken/remove/:productId", removeFromCart);
// router.delete("/guest/:cartToken/clear", clearCart);

// // Authenticated user cart (if needed by app)
// router.post("/user/:userId/add", addToCart);
// router.get("/user/:userId", getCart);
// router.put("/user/:userId/update/:productId", updateCartItem);
// router.delete("/user/:userId/remove/:productId", removeFromCart);
// router.delete("/user/:userId/clear", clearCart);


// export default router ;



import express from 'express' ;

import { addToCart , getCart , updateCartItem , removeFromCart , clearCart, applyCoupon } from "../controllers/cart.controller.js" ; 
import protectRoute from "../middleware/authmiddleware.js" ; 

const router = express.Router() ; 

// add prodcut to cart 

router.post("/:userId/add", protectRoute, addToCart);

// get cart
router.get("/:userId", protectRoute, getCart);
// update cart item
router.put("/:userId/update/:productId", protectRoute, updateCartItem);
// remove item from cart
router.delete("/:userId/remove/:productId", protectRoute, removeFromCart) ;
// clear cart
router.delete("/:userId/clear" ,protectRoute , clearCart) ;
// apply coupon
router.post("/:userId/apply-coupon", protectRoute, applyCoupon);


export default router ;