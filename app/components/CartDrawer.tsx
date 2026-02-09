'use client';

import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartDrawer({open,setOpen}:any){

const {cart,removeFromCart,clearCart} = useCart();

const total = cart.reduce((sum,item)=> sum + item.price,0);

return(

<div style={{
position:"fixed",
top:0,
right: open ? "0px" : "-420px",
width:"420px",
maxWidth:"100%",
height:"100vh",
background:"#0b0d11",
boxShadow:"-10px 0 40px rgba(0,0,0,.6)",
transition:"0.35s",
zIndex:9999,
padding:"20px",
display:"flex",
flexDirection:"column"
}}>

{/* HEADER */}
<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}}>
<h2 style={{color:"white"}}>Your Cart</h2>

<button
onClick={()=>setOpen(false)}
style={{
background:"transparent",
border:"none",
color:"white",
fontSize:"22px",
cursor:"pointer"
}}>
✕
</button>

</div>


{/* ITEMS */}

<div style={{flex:1,overflowY:"auto"}}>

{cart.length===0 && (
<p style={{color:"#aaa"}}>Cart is empty</p>
)}

{cart.map((item,index)=>(

<div key={index} style={{
display:"flex",
gap:"12px",
marginBottom:"18px",
alignItems:"center"
}}>

<img
src={item.image}
style={{
width:"70px",
height:"70px",
objectFit:"cover",
borderRadius:"8px"
}}
/>

<div style={{flex:1}}>

<p style={{color:"white",margin:0}}>
{item.name}
</p>

<p style={{color:"#9ca3af",margin:0}}>
Size: {item.selectedSize}
</p>

<p style={{color:"#22c55e",margin:0}}>
₹{item.price}
</p>

</div>

<button
onClick={()=>removeFromCart(index)}
style={{
background:"red",
border:"none",
color:"white",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
}}>
Remove
</button>

</div>

))}

</div>


{/* FOOTER */}

<div style={{
borderTop:"1px solid #222",
paddingTop:"20px"
}}>

<h3 style={{color:"white"}}>
Total: ₹{total}
</h3>

<Link href="/checkout">
<button style={{
width:"100%",
padding:"14px",
background:"#22c55e",
border:"none",
borderRadius:"10px",
fontWeight:"700",
cursor:"pointer",
marginTop:"10px"
}}>
Checkout
</button>
</Link>

<button
onClick={clearCart}
style={{
marginTop:"10px",
width:"100%",
padding:"10px",
background:"#222",
color:"white",
border:"none",
borderRadius:"8px"
}}>
Clear Cart
</button>

</div>

</div>
);
}
