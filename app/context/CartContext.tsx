'use client';

import { createContext, useContext, useState } from "react";

/* CART ITEM TYPE */
type CartItem = {
  id:string;
  name:string;
  price:number;
  image?:string;
  images?:string[];
  selectedSize:string;
};

/* CONTEXT TYPE */
type CartContextType = {
  cart: CartItem[];
  addToCart:(product:any,size:string)=>void;
  removeFromCart:(index:number)=>void;
  clearCart:()=>void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({children}:{children:React.ReactNode}){

const [cart,setCart] = useState<CartItem[]>([]);

/* ADD */
function addToCart(product:any,size:string){

const item:CartItem = {
id:product.id,
name:product.name,
price:product.price,
image:product.images?.[0] || product.image,
images:product.images,
selectedSize:size
};

setCart(prev=>[...prev,item]);
}

/* REMOVE */
function removeFromCart(index:number){
setCart(prev=> prev.filter((_,i)=> i!==index));
}

/* CLEAR */
function clearCart(){
setCart([]);
}

return(
<CartContext.Provider value={{
cart,
addToCart,
removeFromCart,
clearCart
}}>
{children}
</CartContext.Provider>
);
}

export function useCart(){

const context = useContext(CartContext);

if(!context){
throw new Error("useCart must be used inside CartProvider");
}

return context;
}
