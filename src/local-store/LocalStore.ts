import { CART } from "@/constant/Url";




export const cartStore = {
    getCartStore: ()=>{
      try {
        return JSON.parse(localStorage.getItem(CART.CART_ITEMS));
      } catch (error) {
        return localStorage.getItem(CART.CART_ITEMS)
      }
       
    },
    setCartStore: (cartItem)=>{
      return   localStorage.setItem(CART.CART_ITEMS, JSON.stringify(cartItem));
    }
}