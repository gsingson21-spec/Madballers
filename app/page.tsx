'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";

export default function Home() {

const [products,setProducts] = useState<any[]>([]);
const [selectedCategory, setSelectedCategory] = useState("all");
const { cart, setCart } = useCart();

useEffect(()=>{

async function fetchProducts(){

const querySnapshot = await getDocs(collection(db,"products"));

const productList = querySnapshot.docs.map(doc=>({
id: doc.id,
...doc.data()
}));

setProducts(productList);
}

fetchProducts();

},[]);

return (

<div style={{padding:"40px"}}>

{/* TOP BAR */}
<div style={{
background:"#0f1115",
color:"#fff",
display:"flex",
justifyContent:"center",
gap:"40px",
padding:"10px",
fontSize:"14px",
borderBottom:"1px solid rgba(255,255,255,0.05)"
}}>

<span>🚚 Fast Delivery</span>
<span>✔ Authentic Products</span>
<span>💬 WhatsApp Support</span>
<span>🔁 Easy Returns</span>

</div>


{/* HERO */}
<div style={{
height:"280px",
background:"linear-gradient(135deg, #111, #222)",
color:"white",
display:"flex",
flexDirection:"column",
justifyContent:"center",
padding:"60px"
}}>

<h1 style={{
fontSize:"64px",
margin:0,
fontWeight:"800"
}}>
Dominate The Pitch
</h1>

<p style={{
fontSize:"20px",
opacity:0.8,
marginTop:"10px"
}}>
Elite Football Boots. Built for Speed.
</p>

</div>


{/* TITLE */}
<h2 style={{
fontSize:"32px",
fontWeight:"700",
marginTop:"60px",
marginBottom:"20px",
paddingLeft:"40px"
}}>
Featured Products
</h2>


{/* CATEGORY BUTTONS */}
<div style={{
display:"flex",
gap:"12px",
padding:"20px 40px",
flexWrap:"wrap"
}}>

{["all","boots","jerseys","gloves","jackets","balls","gear"].map((cat)=>(

<button
key={cat}
onClick={()=>setSelectedCategory(cat)}

style={{
padding:"10px 20px",
borderRadius:"999px",
border:"1px solid rgba(255,255,255,0.08)",
cursor:"pointer",
background:selectedCategory===cat ? "#ffffff" : "transparent",
color:selectedCategory===cat ? "#000" : "#fff",
fontWeight:"600"
}}
>
{cat.toUpperCase()}
</button>

))}

</div>


{/* PRODUCTS GRID */}
<div style={{
maxWidth:"1200px",
margin:"0 auto"
}}>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit, minmax(260px,1fr))",
gap:"28px"
}}>

{products
.filter((product)=>product.featured) // ⭐ ONLY FEATURED
.filter((product)=>
selectedCategory==="all"
? true
: product.category===selectedCategory
)
.map((product)=>{

// ✅ REAL stock check from sizes
const isOutOfStock = Object.values(product.sizes || {}).every(
(qty)=> Number(qty) === 0
);

return(

<Link href={`/product/${product.id}`} key={product.id}>

<div style={{
padding:"16px",
borderRadius:"14px",
cursor:"pointer",
background:"#0f1115",
boxShadow:"0 10px 30px rgba(0,0,0,0.25)",
transition:"all 0.25s ease",
overflow:"hidden"
}}>

<img
src={product.image}
style={{
width:"100%",
height:"320px",
objectFit:"contain",
background:"#0f1115",
borderRadius:"12px"
}}
/>

<h3 style={{
color:"#ffffff",
fontSize:"18px",
marginTop:"12px"
}}>
{product.name}
</h3>

<p style={{
color:"#9ca3af",
fontWeight:"600",
marginTop:"6px"
}}>
₹{product.price}
</p>

<button
disabled={isOutOfStock}
onClick={(e)=>{
e.preventDefault();
setCart([...cart, product]);
}}

style={{
marginTop:"10px",
width:"100%",
padding:"10px",
background: isOutOfStock ? "#444" : "#fff",
color: isOutOfStock ? "#999" : "#000",
border:"none",
borderRadius:"8px",
fontWeight:"600",
cursor: isOutOfStock ? "not-allowed" : "pointer"
}}
>
{isOutOfStock ? "Out of Stock" : "Add to Cart"}
</button>

</div>

</Link>

);

})}

</div>
</div>
</div>

);
}