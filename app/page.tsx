'use client';

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "./context/CartContext";
import { Product } from "@/types/Product";

export default function Home(){

const [products,setProducts] = useState<Product[]>([]);
const [selectedCategory,setSelectedCategory] = useState("featured products");
const {addToCart} = useCart();
const [popupProduct,setPopupProduct] = useState<Product | null>(null);
const [selectedSize,setSelectedSize] = useState<string | null>(null);

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

if(selectedCategory === "featured products") 
    return product.featured ===true;

return product.category === selectedCategory;

});


return(

<div style={{
background:"#000",
minHeight:"100vh"
}}>

{/* ================= HERO ================= */}

{/* 💥 SUPERNOVA HERO */}

<div style={{
height:"100vh",
position:"fixed",
top:0,
left:0,
width:"100%",
zIndex:-1,
overflow:"hidden"
}}>

{/* BACKGROUND IMAGE */}

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

{/* CINEMATIC ORANGE GLOW */}

<div style={{
position:"absolute",
width:"100%",
height:"100%",
background:`
radial-gradient(circle at 20% 30%, rgba(255,120,0,.35), transparent 40%),
radial-gradient(circle at 80% 70%, rgba(255,60,0,.25), transparent 40%)
`
}}/>

{/* TEXT */}

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


{/* ================= PRODUCTS PANEL ================= */}

{/* SUPERNOVA PRODUCT LAYER */}

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

{/* 🔥 CATEGORY BAR */}

<div style={{
display:"flex",
gap:"14px",
overflowX:"auto",
paddingBottom:"20px",
marginBottom:"40px"
}}>

{["featured products","boots","jerseys","gloves","jackets","balls","gear"].map(cat=>(

<button
onClick={() => setSelectedCategory(cat)}
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
transition:"0.25s",
backdropFilter:"blur(10px)"
}}
>
{cat.charAt(0).toUpperCase() + cat.slice(1)}    
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
padding:"24px",
borderRadius:"26px",
border:"1px solid rgba(255,120,0,.15)",
transition:"0.45s",
cursor:"pointer"
}}

onMouseEnter={(e)=>{
e.currentTarget.style.transform="translateY(-18px) scale(1.03)";
e.currentTarget.style.boxShadow="0 60px 140px rgba(255,120,0,.25)";
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0) scale(1)";
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
setPopupProduct(product);
setSelectedSize(null);
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

{/* SIZE SELECTOR POPUP */}

{popupProduct && (

<div
onClick={()=>setPopupProduct(null)}
style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,.9)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:9999
}}
>

<div
onClick={(e)=>e.stopPropagation()}
style={{
background:"#050505",
padding:"40px",
borderRadius:"24px",
width:"420px",
maxWidth:"92%"
}}
>

<img
src={popupProduct.images?.[0]}
style={{
width:"100%",
borderRadius:"16px",
marginBottom:"15px"
}}
/>

<h2 style={{color:"white"}}>
{popupProduct.name}
</h2>

<p style={{
color:"#ff7a00",
fontWeight:"900",
fontSize:"22px"
}}>
₹{popupProduct.price}
</p>


{/* SIZES */}

<div style={{
display:"flex",
flexWrap:"wrap",
gap:"12px",
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
padding:"12px 18px",
borderRadius:"12px",
border:selectedSize===size
? "2px solid #ff7a00"
: "1px solid #333",
background:"#111",
color:"white",
cursor:"pointer"
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
id:popupProduct.id,
name:popupProduct.name,
price:popupProduct.price,
image:popupProduct.images?.[0] || "",
size:selectedSize!
});

setPopupProduct(null);

}}
style={{
width:"100%",
padding:"16px",
borderRadius:"14px",
border:"none",
background:selectedSize
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: "#222",
color:"#000",
fontWeight:"900",
cursor:"pointer"
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
