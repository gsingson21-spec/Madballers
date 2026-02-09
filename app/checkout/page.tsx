'use client';

import { useCart } from "../context/CartContext";

export default function Checkout(){

const { cart, removeFromCart, clearCart } = useCart();

const total = cart.reduce((sum,item)=> sum + item.price,0);

return(

<div style={{
minHeight:"100vh",
background:"#0b0d11",
color:"white",
padding:"40px"
}}>

<h1>Checkout</h1>

{/* ITEMS */}

<div style={{marginTop:"30px"}}>

{cart.map(item=>(

<div key={item.id} style={{
display:"flex",
gap:"20px",
marginBottom:"20px",
alignItems:"center",
borderBottom:"1px solid #222",
paddingBottom:"12px"
}}>

<img
src={item.images?.[0] || item.image}
style={{
width:"90px",
height:"90px",
objectFit:"cover",
borderRadius:"10px"
}}
/>

<div style={{flex:1}}>
<h3>{item.name}</h3>
<p>₹{item.price}</p>
<p>Size: {item.selectedSize}</p>
</div>

<button
onClick={()=>removeFromCart(item.id)}
style={{
background:"red",
border:"none",
padding:"8px 14px",
borderRadius:"8px",
color:"white",
cursor:"pointer"
}}
>
Remove
</button>

</div>

))}

</div>


{/* TOTAL */}

<h2>Total: ₹{total}</h2>


{/* PAYMENT BUTTON */}

<button
style={{
marginTop:"20px",
width:"320px",
padding:"16px",
background:"#22c55e",
border:"none",
borderRadius:"12px",
fontWeight:"700",
fontSize:"18px",
cursor:"pointer"
}}
>
Proceed To Payment
</button>

</div>
);
}