'use client';

import { useCart } from "@/app/context/CartContext";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Checkout(){

const {cart,removeFromCart,clearCart} = useCart();
const router = useRouter();

/* 🔥 FORCE LOGIN */
useEffect(()=>{

const user = auth.currentUser;

if(!user){
router.push("/login");
}

},[]);


/* 🔥 TOTAL */
const total = cart.reduce((sum,item)=>sum+item.price,0);


/* 🔥 WHATSAPP ORDER GENERATOR */

function placeOrder(){

if(cart.length === 0){
alert("Cart is empty");
return;
}

let message = `🔥 *NEW ORDER — MAD BALLERS* 🔥\n\n`;

cart.forEach((item,i)=>{

message += `*${i+1}. ${item.name}*\n`;
message += `Size: ${item.size}\n`;
message += `Price: ₹${item.price}\n`;
message += `Image: ${item.image}\n\n`;

});

message += `💰 *Total: ₹${total}*\n\n`;
message += `Customer ready to purchase ✅`;

const phone = "919366946633"; // PUT HIS NUMBER

const url =
`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

window.open(url,"_blank");

clearCart();

router.push("/");
}

return(

<div style={{
minHeight:"100vh",
background:"linear-gradient(180deg,#020617,#000)",
color:"white",
padding:"60px 20px"
}}>

<div style={{
maxWidth:"900px",
margin:"auto"
}}>

<h1 style={{
fontSize:"42px",
fontWeight:"900",
marginBottom:"40px"
}}>
Checkout
</h1>



{/* CART ITEMS */}

{cart.map(item=>(

<div key={item.id+item.size}

style={{
display:"flex",
gap:"20px",
alignItems:"center",
marginBottom:"20px",
background:"rgba(255,255,255,.03)",
padding:"18px",
borderRadius:"16px",
border:"1px solid rgba(255,255,255,.05)",
backdropFilter:"blur(10px)"
}}>

<img
src={item.image}
style={{
width:"90px",
height:"90px",
objectFit:"cover",
borderRadius:"12px"
}}
/>

<div style={{flex:1}}>

<h3 style={{margin:0}}>
{item.name}
</h3>

<p style={{opacity:.7}}>
Size: {item.size}
</p>

<p style={{
color:"#22c55e",
fontWeight:"800"
}}>
₹{item.price}
</p>

</div>


<button
onClick={()=>removeFromCart(item.id,item.size)}
style={{
background:"#ef4444",
border:"none",
color:"white",
padding:"10px 14px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"700"
}}>
Remove
</button>

</div>

))}



{/* TOTAL */}

<div style={{
marginTop:"40px",
paddingTop:"20px",
borderTop:"1px solid rgba(255,255,255,.08)",
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}>

<h2>Total</h2>

<h2 style={{color:"#22c55e"}}>
₹{total}
</h2>

</div>



{/* ORDER BUTTON */}

<button
onClick={placeOrder}
style={{
marginTop:"30px",
width:"100%",
padding:"18px",
borderRadius:"16px",
border:"none",
fontWeight:"900",
fontSize:"18px",
cursor:"pointer",

background:"linear-gradient(135deg,#f97316,#ea580c)",
boxShadow:"0 20px 60px rgba(249,115,22,.35)"
}}>
Order on WhatsApp 🚀
</button>

</div>

</div>

);
}
