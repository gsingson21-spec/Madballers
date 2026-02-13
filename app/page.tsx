'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import { Product } from "@/types/Product";

export default function Home(){

const [products,setProducts] = useState<Product[]>([]);
const {addToCart} = useCart();

useEffect(()=>{

async function fetchProducts(){

const snapshot = await getDocs(collection(db,"products"));

const list = snapshot.docs.map(doc=>({
id:doc.id,
...doc.data()
})) as Product[];

setProducts(list);
}

fetchProducts();

},[]);


/* STOCK CHECK */

function isOut(product:Product){
if(!product.sizes) return true;

return Object.values(product.sizes)
.every((qty:number)=> qty <= 0);
}


return(

<div style={{
background:"#000",
minHeight:"200vh"
}}>

{/* ================= HERO ================= */}

<section style={{
position:"sticky",
top:0,
height:"100vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
overflow:"hidden",
zIndex:1
}}>

{/* BACKGROUND IMAGE */}

<img
src="/images/hero.png"
style={{
position:"absolute",
width:"100%",
height:"100%",
objectFit:"cover",
opacity:.35,
filter:"brightness(.6)"
}}
/>

{/* DARK OVERLAY */}

<div style={{
position:"absolute",
width:"100%",
height:"100%",
background:"radial-gradient(circle at 50% 40%, rgba(255,120,0,.35), black 70%)"
}}/>

{/* TEXT */}

<h1 style={{
fontSize:"clamp(60px,10vw,140px)",
fontWeight:"900",
letterSpacing:"-4px",
background:"linear-gradient(90deg,#ff7a00,#ff2d00)",
WebkitBackgroundClip:"text",
color:"transparent",
zIndex:2
}}>
MAD BALLERS
</h1>

<p style={{
color:"#ddd",
fontSize:"22px",
zIndex:2
}}>
India’s Most Aggressive Football Store
</p>

</section>



{/* ================= PRODUCTS LAYER ================= */}

<section style={{
marginTop:"-120px",
background:"#050505",
borderTopLeftRadius:"60px",
borderTopRightRadius:"60px",
padding:"80px 6vw",
position:"relative",
zIndex:5,
boxShadow:"0 -40px 120px rgba(255,120,0,.25)"
}}>

<h2 style={{
color:"white",
fontSize:"42px",
marginBottom:"40px",
fontWeight:"800"
}}>
🔥 Featured Drops
</h2>


{/* GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"32px"
}}>

{products.map(product=>{

const out = isOut(product);

return(

<div key={product.id}

style={{
background:"linear-gradient(145deg,#0a0a0a,#050505)",
padding:"24px",
borderRadius:"26px",
border:"1px solid #111",
transition:"0.45s",
cursor:"pointer"
}}

onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-16px) scale(1.02)";
e.currentTarget.style.boxShadow="0 50px 120px rgba(255,120,0,.25)";
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0px)";
e.currentTarget.style.boxShadow="none";
}}
>

<img
src={product.images?.[0]}
style={{
width:"100%",
height:"220px",
objectFit:"contain"
}}
/>

<h3 style={{
color:"white",
marginTop:"14px",
fontSize:"20px"
}}>
{product.name}
</h3>

<p style={{
color:"#ff7a00",
fontWeight:"900",
fontSize:"20px"
}}>
₹{product.price}
</p>

<button
disabled={out}
onClick={()=>{

addToCart({
id:product.id,
name:product.name,
price:product.price,
image:product.images?.[0] || "",
size:Object.keys(product.sizes || {})[0] || ""
});

}}
style={{
marginTop:"12px",
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",
background: out ? "#222" : "linear-gradient(90deg,#ff7a00,#ffb347)",
color:"#000",
fontWeight:"900",
cursor:"pointer"
}}
>
{out ? "Out of Stock":"Add To Cart"}
</button>

</div>

);

})}

</div>

</section>

</div>
);
}
