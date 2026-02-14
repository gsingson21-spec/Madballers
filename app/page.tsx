'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import { Product } from "@/types/Product";
import Link from "next/link";

export default function Home(){

const [products,setProducts] = useState<Product[]>([]);
const [selectedCategory,setSelectedCategory] = useState("featured");
const {addToCart} = useCart();

/* ================= FETCH ================= */

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


/* ================= FILTER ================= */

const filtered = products.filter(product=>{

// ⭐ FEATURED DEFAULT
if(selectedCategory === "featured"){
return product.featured === true;
}

return product.category === selectedCategory;

});


/* ================= UI ================= */

return(

<div style={{
background:"#000",
minHeight:"100vh"
}}>

{/* ================= HERO ================= */}

<div style={{
height:"100vh",
position:"fixed",
top:0,
left:0,
width:"100%",
zIndex:-1,
overflow:"hidden"
}}>

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

<div style={{
position:"absolute",
width:"100%",
height:"100%",
background:`
radial-gradient(circle at 20% 30%, rgba(255,120,0,.35), transparent 40%),
radial-gradient(circle at 80% 70%, rgba(255,60,0,.25), transparent 40%)
`
}}/>

<div style={{
position:"relative",
height:"100%",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center"
}}>

<h1 style={{
fontSize:"clamp(56px,9vw,140px)",
fontWeight:900,
letterSpacing:"-3px",
background:"linear-gradient(90deg,#ff7a00,#ff2d00)",
WebkitBackgroundClip:"text",
color:"transparent",
textShadow:"0 20px 80px rgba(255,120,0,.5)"
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

</div>
</div>


{/* ================= PRODUCTS LAYER ================= */}

<div style={{
position:"relative",
marginTop:"100vh",
background:"rgba(5,5,5,.85)",
backdropFilter:"blur(30px)",
borderTopLeftRadius:"50px",
borderTopRightRadius:"50px",
padding:"80px 40px",
boxShadow:"0 -40px 120px rgba(0,0,0,.9)"
}}>

{/* ================= CATEGORY ================= */}

<div style={{
display:"flex",
gap:"14px",
overflowX:"auto",
paddingBottom:"20px",
marginBottom:"40px"
}}>

{["featured","boots","jerseys","gloves","jackets","balls","gear"].map(cat=>(

<button
key={cat}   // ⭐⭐⭐ FIXES YOUR ERROR
onClick={()=>setSelectedCategory(cat)}
style={{
padding:"12px 26px",
borderRadius:"999px",
border:selectedCategory===cat
? "1px solid #ff7a00"
: "1px solid rgba(255,255,255,.08)",

background:selectedCategory===cat
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: "rgba(255,255,255,.03)",

color:selectedCategory===cat
? "#000"
: "#ddd",

fontWeight:"800",
letterSpacing:".5px",
cursor:"pointer",
transition:"0.25s"
}}
>
{cat.toUpperCase()}
</button>

))}

</div>



{/* ================= PRODUCT GRID ================= */}

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"34px"
}}>

{filtered.map(product=>(

<div
key={product.id}   // ⭐ ALSO IMPORTANT
style={{
background:"linear-gradient(145deg,#0a0a0a,#050505)",
padding:"24px",
borderRadius:"26px",
border:"1px solid rgba(255,120,0,.15)",
transition:"0.45s",
cursor:"pointer"
}}
>

<Link href={`/product/${product.id}`}>
<img
src={product.images?.[0]}
style={{
width:"100%",
height:"230px",
objectFit:"contain"
}}
/>
</Link>

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

// ⭐ FORCE SIZE CHECK
if(!product.sizes){
alert("Select size on product page");
return;
}

addToCart({
id:product.id,
name:product.name,
price:product.price,
image:product.images?.[0] || "",
size:Object.keys(product.sizes)[0] // fallback
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
