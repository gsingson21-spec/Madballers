'use client';

import Link from "next/link";
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

const filteredProducts = products.filter(product=>{

if(selectedCategory==="all"){
return product.featured===true;
}

return product.category===selectedCategory;

});


return(

<div style={{
padding:"20px",
background:"#0b0d11",
minHeight:"100vh"
}}>

{/* HERO */}

<div style={{
padding:"40px 20px",
borderRadius:"14px",
background:"linear-gradient(135deg,#111,#1a1f2b)",
color:"white",
marginBottom:"30px"
}}>
<h1>Dominate The Pitch</h1>
<p>Elite Football Boots Built For Speed ⚡</p>
</div>


{/* CATEGORY */}

<div style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginBottom:"25px"
}}>

{["all","boots","jerseys","gloves","jackets","balls","gear"].map(cat=>(

<button
key={cat}
onClick={()=>setSelectedCategory(cat)}
style={{
padding:"8px 16px",
borderRadius:"999px",
border:"1px solid #222",
background:selectedCategory===cat ? "#fff" : "transparent",
color:selectedCategory===cat ? "#000" : "#aaa",
cursor:"pointer"
}}>
{cat.toUpperCase()}
</button>

))}

</div>


{/* GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"18px"
}}>

{filteredProducts.map(product=>{

const sizes = Object.entries(product.sizes || {})
.filter(([_,stock])=> Number(stock) > 0);

return(

<div key={product.id}
style={{
background:"#11151c",
padding:"14px",
borderRadius:"12px"
}}>

<Link href={`/product/${product.id}`}>

<img
src={product.images?.[0] || product.image}
style={{
width:"100%",
height:"180px",
objectFit:"contain",
cursor:"pointer"
}}
/>

</Link>

<h3 style={{color:"#fff"}}>
{product.name}
</h3>

<p style={{color:"#9ca3af"}}>
₹{product.price}
</p>


{/* SIZE QUICK PICK */}

<div style={{
display:"flex",
gap:"6px",
flexWrap:"wrap"
}}>

{sizes.map(([size])=>(
<button
key={size}
onClick={()=>addToCart(product,size)}
style={{
padding:"6px 10px",
background:"#222",
border:"1px solid #333",
color:"white",
borderRadius:"6px",
cursor:"pointer"
}}>
{size}
</button>
))}

</div>

</div>

);

})}

</div>

</div>
);
}
