'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import { Product } from "@/types/Product";

export default function Home(){

const [products,setProducts] = useState<Product[]>([]);
const [popupProduct,setPopupProduct] = useState<Product | null>(null);
const [selectedSize,setSelectedSize] = useState<string | null>(null);

const {addToCart} = useCart();

/* FETCH */
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


/* STOCK */
function isOut(product:Product){
if(!product.sizes) return true;
return Object.values(product.sizes).every((q:any)=>q<=0);
}

return(

<div style={{
background:"#05070f",
minHeight:"100vh"
}}>

{/* ================= HERO ================= */}

<div style={{
height:"95vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center",
padding:"0 20px",

background:`
radial-gradient(circle at 30% 20%,#00ff8820,transparent),
radial-gradient(circle at 70% 80%,#0066ff20,transparent),
#05070f
`
}}>

<img
src="/images/hero.png"
style={{
position:"absolute",
right:"5%",
top:"50%",
transform:"translateY(-50%)",
height:"85%",
objectFit:"contain",
filter:"drop-shadow(0 40px 80px rgba(255,140,0,.35))"
}}
/>


<h1 style={{
fontSize:"clamp(42px,8vw,90px)",
fontWeight:900,
letterSpacing:"-2px",
margin:0,

background:"linear-gradient(90deg,#00ff87,#60efff)",
WebkitBackgroundClip:"text",
color:"transparent"
}}>
Mad Ballers
</h1>

<p style={{
marginTop:"20px",
color:"#9ca3af",
fontSize:"20px"
}}>
India's Most Premium Football Store
</p>

</div>



{/* ================= PRODUCTS (OVERLAP) ================= */}

<div style={{

marginTop:"-120px",   // 🔥 OVERLAP HERO
borderTopLeftRadius:"40px",
borderTopRightRadius:"40px",

background:"#020617",
padding:"60px 6vw",

boxShadow:"0 25px 60px rgba(255,122,0,.18)"
}}>


{/* GRID */}

<div style={{

display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
gap:"30px"

}}>

{products.map(product=>{

const out = isOut(product);

return(

<div
key={product.id}
style={{

background:"linear-gradient(145deg,#020617,#07131f)",
padding:"20px",
borderRadius:"22px",

border:"1px solid rgba(255,255,255,.06)",

cursor:"pointer",
transition:"0.35s"
}}

onMouseEnter={(e:any)=>{
e.currentTarget.style.transform="translateY(-12px)";
}}

onMouseLeave={(e:any)=>{
e.currentTarget.style.transform="translateY(0px)";
}}
>

<img
src={product.images?.[0] || product.image}
style={{
width:"100%",
height:"220px",
objectFit:"contain"
}}
/>

<h3 style={{
color:"white"
}}>
{product.name}
</h3>

<p style={{
color:"#00ff87",
fontWeight:800,
fontSize:"18px"
}}>
₹{product.price}
</p>


<button
disabled={out}
onClick={()=>{
setPopupProduct(product);
setSelectedSize(null);
}}
style={{
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",

background: out ? "#111":"linear-gradient(90deg,#00ff87,#60efff)",
color:"#002",
fontWeight:800,
cursor:"pointer"
}}
>
{out?"Out of Stock":"Add To Cart"}
</button>

</div>

);

})}

</div>

</div>



{/* ================= SIZE POPUP ================= */}

{popupProduct && (

<div
onClick={()=>setPopupProduct(null)}
style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,.85)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:9999
}}>

<div
onClick={(e)=>e.stopPropagation()}
style={{
background:"#020617",
padding:"30px",
borderRadius:"20px",
width:"420px",
maxWidth:"95%"
}}
>

<h2 style={{color:"white"}}>
{popupProduct.name}
</h2>

<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
margin:"20px 0"
}}>

{Object.entries(popupProduct.sizes || {}).map(([size,stock]:any)=>{

const out = Number(stock)<=0;

return(

<button
key={size}
disabled={out}
onClick={()=>setSelectedSize(size)}
style={{
padding:"10px 16px",
borderRadius:"10px",
border:selectedSize===size
?"2px solid #00ff87":"1px solid #333",
background:"#07131f",
color:"var(--text)"
}}
>
{size}
</button>

);

})}

</div>

<button
disabled={!selectedSize}
onClick={()=>{

addToCart({
id: popupProduct.id,
name: popupProduct.name,
price: popupProduct.price,
image: popupProduct.images?.[0] || "",
size:selectedSize!
});

setPopupProduct(null);

}}
style={{
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",
background:"#00ff87",
fontWeight:900
}}
>
Add To Cart
</button>

</div>
</div>

)}

</div>
);
}
