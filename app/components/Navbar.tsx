"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar(){

const pathname = usePathname();
const { cart } = useCart();

const [cartOpen,setCartOpen] = useState(false);

/* Auto close cart on route change */
useEffect(()=>{
setCartOpen(false);
},[pathname]);

return(
<>
<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
zIndex:9999,

/* GLASS EFFECT */
background:"rgba(10,10,10,.75)",
backdropFilter:"blur(20px)",
borderBottom:"1px solid rgba(255,255,255,.06)",

display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 7vw"
}}>

{/* LOGO */}

<Link href="/" style={{
fontWeight:900,
fontSize:"28px",
letterSpacing:"1px",
textDecoration:"none"
}}>
<span style={{
background:"linear-gradient(90deg,#00ff87,#60efff)",
WebkitBackgroundClip:"text",
color:"transparent"
}}>
Mad Ballers
</span>
</Link>



{/* RIGHT SIDE */}

<div style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}>

<button
onClick={()=>setCartOpen(true)}
style={{
padding:"10px 18px",
borderRadius:"14px",
border:"1px solid rgba(255,255,255,.08)",
background:"var(--primary)",
color:"white",
fontWeight:700,
cursor:"pointer",
transition:"0.3s"
}}
>
🛒 {cart.length}
</button>

</div>

</div>

<CartDrawer open={cartOpen} setOpen={setCartOpen}/>
</>
);
}
