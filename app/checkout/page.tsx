'use client';

import { useCart } from "../context/CartContext";

export default function Checkout(){

const {cart, clearCart} = useCart();

const total = cart.reduce((sum,item)=>sum+item.price,0);

function sendWhatsApp(){

if(cart.length === 0){
alert("Cart is empty");
return;
}

let message = `🔥 *NEW ORDER — MAD BALLERS* 🔥%0A%0A`;

cart.forEach(item=>{
message += `• ${item.name}%0A`;
message += `Size: ${item.size || "Ask customer"}%0A`;
message += `Price: ₹${item.price}%0A%0A`;
});

message += `💰 *Total: ₹${total}*`;

const phone = "919366946633"; // PUT HIS NUMBER
const url = `https://wa.me/${phone}?text=${message}`;

window.open(url,"_blank");

clearCart();
}

return(

<div style={{
maxWidth:"900px",
margin:"120px auto",
padding:"40px",
background:"rgba(10,10,10,.7)",
backdropFilter:"blur(20px)",
borderRadius:"30px",
border:"1px solid rgba(255,120,0,.2)"
}}>

<h1 style={{
fontSize:"48px",
fontWeight:"900",
marginBottom:"40px"
}}>
Checkout
</h1>

{cart.map(item => (

<div
key={`${item.id}-${item.size}`}
style={{
display:"flex",
alignItems:"center",
gap:"18px",
background:"#0a0a0a",
padding:"16px",
borderRadius:"14px",
marginBottom:"14px",
border:"1px solid rgba(255,120,0,.15)",
transition:"0.3s",
transform:"scale(1.0)"
}}
>

{/* IMAGE */}
<img
src={item.image}
style={{
width:"90px",
height:"90px",
objectFit:"contain",
borderRadius:"10px",
background:"#050505",
padding:"6px"
}}
/>

{/* INFO */}
<div style={{flex:1}}>

<h3 style={{
color:"white",
fontWeight:"800"
}}>
{item.name}
</h3>

<p style={{color:"#ff7a00"}}>
₹{item.price}
</p>

{item.size && (
<p style={{color:"#999"}}>
Size: {item.size}
</p>
)}

</div>

</div>

))}

<h2 style={{marginTop:"40px"}}>
Total: <span style={{color:"#ff7a00"}}>₹{total}</span>
</h2>

<button
onClick={sendWhatsApp}
style={{
marginTop:"30px",
width:"100%",
padding:"18px",
borderRadius:"14px",
border:"none",
background:"linear-gradient(90deg,#ff7a00,#ffb347)",
color:"#000",
fontWeight:"900",
fontSize:"18px",
cursor:"pointer"
}}
>
Order on WhatsApp 🚀
</button>

</div>
);
}
