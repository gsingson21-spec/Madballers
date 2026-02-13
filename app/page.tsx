'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import { Product } from "@/types/Product";

export default function Home(){

const [products,setProducts] = useState<Product[]>([]);
const [selectedCategory,setSelectedCategory] = useState("all");

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


/* FILTER */

const filtered = products.filter(product=>{

if(selectedCategory === "all") return true;

return product.category === selectedCategory;

});


return(

<div style={{
background:"#000",
minHeight:"100vh"
}}>

{/* ================= HERO ================= */}

<section style={{
height:"100vh",
position:"sticky",
top:0,
display:"flex",
alignItems:"center",
justifyContent:"center",
overflow:"hidden"
}}>

{/* HERO IMAGE */}

<img
src="/images/hero.png"
style={{
position:"absolute",
width:"100%",
height:"100%",
objectFit:"cover",
filter:"brightness(.35)"
}}
/>

{/* ORANGE GLOW */}

<div style={{
position:"absolute",
width:"100%",
height:"100%",
background:"radial-gradient(circle at 50% 40%, rgba(255,115,0,.35), transparent 60%)"
}}/>

{/* TEXT */}

<div style={{
position:"relative",
textAlign:"center"
}}>

<h1 style={{
fontSize:"clamp(56px,9vw,140px)",
fontWeight:"900",
letterSpacing:"-3px",
background:"linear-gradient(90deg,#ff6a00,#ff2d00)",
WebkitBackgroundClip:"text",
color:"transparent"
}}>
MAD BALLERS
</h1>

<p style={{
color:"#ddd",
fontSize:"22px",
marginTop:"10px"
}}>
India’s Most Aggressive Football Store
</p>

<p style={{
marginTop:"60px",
color:"#ff7a00"
}}>
Scroll ↓
</p>

</div>

</section>



{/* ================= PRODUCTS PANEL ================= */}

<div style={{
marginTop:"-120px",
background:"#050505",
borderTopLeftRadius:"60px",
borderTopRightRadius:"60px",
padding:"70px 6vw",
position:"relative",
zIndex:2
}}>

{/* 🔥 CATEGORY BAR */}

<div style={{
display:"flex",
gap:"14px",
flexWrap:"wrap",
justifyContent:"center",
marginBottom:"60px"
}}>

{["all","boots","jerseys","gloves","jackets","balls","gear"].map(cat=>(

<button
key={cat}
onClick={()=>setSelectedCategory(cat)}
style={{
padding:"12px 26px",
borderRadius:"999px",
border:"1px solid #222",
background:selectedCategory===cat
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: "#0a0a0a",
color:selectedCategory===cat ? "#000" : "#aaa",
fontWeight:"800",
cursor:"pointer",
transition:"0.25s"
}}
>
{cat.toUpperCase()}
</button>

))}

</div>



{/* 🔥 PRODUCT GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"34px"
}}>

{filtered.map(product=>(

<div
key={product.id}
style={{
background:"linear-gradient(145deg,#0a0a0a,#050505)",
padding:"26px",
borderRadius:"26px",
border:"1px solid #111",
transition:"0.35s",
cursor:"pointer"
}}

onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-14px)";
e.currentTarget.style.boxShadow="0 60px 120px rgba(255,115,0,.25)";
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0)";
e.currentTarget.style.boxShadow="none";
}}
>

<img
src={product.images?.[0]}
style={{
width:"100%",
height:"230px",
objectFit:"contain"
}}
/>

<h3 style={{
color:"white",
marginTop:"16px",
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
onClick={()=>{
addToCart({
id:product.id,
name:product.name,
price:product.price,
image:product.images?.[0] || "",
size:""
});
}}
style={{
marginTop:"14px",
width:"100%",
padding:"14px",
borderRadius:"12px",
border:"none",
background:"linear-gradient(90deg,#ff7a00,#ffb347)",
color:"#000",
fontWeight:"900",
cursor:"pointer"
}}
>
Add To Cart
</button>

</div>

))}

</div>

</div>

</div>
);
}
