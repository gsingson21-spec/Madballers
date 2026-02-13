"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar(){

const pathname = usePathname();
const router = useRouter();
const { cart } = useCart();
const [cartOpen,setCartOpen] = useState(false);

useEffect(()=>{

function secretAdmin(e:KeyboardEvent){

if(e.ctrlKey && e.shiftKey && e.key === "A"){
router.push("/admin");
}

}

window.addEventListener("keydown",secretAdmin);

return ()=>window.removeEventListener("keydown",secretAdmin);

},[]);

return(
<>
<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
zIndex:9999,

/* GLASS EFFECT */
background:"rgba(0,0,0,.65)",
backdropFilter:"blur(18px)",
borderBottom:"1px solid rgba(255,140,0,.2)",

display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 7vw"
}}>

{/* LOGO */}

<Link
href="/"
onDoubleClick={()=>{
window.location.href="/admin";
}}
style={{
fontWeight:900,
fontSize:"28px",
letterSpacing:"1px",
textDecoration:"none"
}}
>
<span style={{
background:"linear-gradient(90deg,#ff7a00,#ffb347)",
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

<div
onClick={()=>window.location.href="/admin"}
style={{
position:"fixed",
bottom:"20px",
left:"20px",
width:"14px",
height:"14px",
borderRadius:"50%",
background:"#000",
opacity:.05,
cursor:"pointer"
}}
/>

<button
onClick={()=>setCartOpen(true)}
style={{
padding:"10px 18px",
borderRadius:"14px",
border:"1px solid rgba(255,255,255,.08)",
background:"linear-gradient(90deg,#ff7a00,#ffb347)",
color:"var(--bg)",
fontWeight:"800",
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
