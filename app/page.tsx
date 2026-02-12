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

/* POPUP STATE */
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


/* STOCK CHECK */

function isOut(product:Product){
if(!product.sizes) return true;

return Object.values(product.sizes)
.every((qty:number)=> qty <= 0);
}


/* FILTER */

const filtered = products.filter(product=>{

if(selectedCategory === "all"){
return product.featured === true;
}

return product.category === selectedCategory;

});


return(

<div style={{
padding:"30px",
background:"#020617",
minHeight:"100vh"
}}>

{/* HERO */}

{/* GOD HERO */}

<div style={{

height:"88vh",
display:"flex",
flexDirection:"column",
justifyContent:"center",
alignItems:"center",
textAlign:"center",

background:`
linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.95)),
url('/hero.jpg')
`,

backgroundSize:"cover",
backgroundPosition:"center",

borderBottom:"1px solid var(--border)"
}}>

<h1 style={{
fontSize:"clamp(48px,8vw,110px)",
fontWeight:"900",
letterSpacing:"-2px",
color:"white"
}}>
MAD BALLERS
</h1>

<p style={{
color:"var(--orange)",
fontWeight:"700",
fontSize:"22px",
marginTop:"10px"
}}>
Built Different.
Play Different.
</p>

<button style={{

marginTop:"30px",
padding:"18px 44px",

background:"linear-gradient(135deg,#FF7A00,#ff9a3d)",

border:"none",
borderRadius:"14px",

fontWeight:"900",
fontSize:"18px",

cursor:"pointer",

boxShadow:"0 20px 80px rgba(255,122,0,.45)"
}}>
SHOP NOW
</button>

</div>

{/* TRUST BAR */}

<div style={{
display:"flex",
justifyContent:"center",
gap:"40px",
flexWrap:"wrap",
marginBottom:"60px",
padding:"18px",
background:"rgba(255,255,255,.03)",
backdropFilter:"blur(10px)",
border:"1px solid rgba(255,255,255,.05)",
borderRadius:"14px",
fontSize:"14px",
fontWeight:"600",
}}>
<span>Premium Quality ⚡</span>
<span>WhatsApp Orders 💬</span>
<span>All India Shipping 🚚</span>
<span>Secure Checkout 🔒</span>
<span>UPI • GPay • PhonePe 💳</span>
</div>


{/* CATEGORY */}

<div style={{
display:"flex",
gap:"12px",
flexWrap:"wrap",
marginBottom:"70px",
justifyContent:"center"
}}>

{["all","boots","jerseys","gloves","jackets","balls","gear"].map(cat=>(

<button
key={cat}
onClick={()=>setSelectedCategory(cat)}
style={{
padding:"10px 20px",
borderRadius:"999px",
border:"1px solid rgba(255,255,255,.08)",
background:selectedCategory===cat ? "linear-gradient(135deg,#FF7A00,#ff9a3d)" : "transparent",
color:selectedCategory===cat ? "#02120a" : "#aaa",
cursor:"pointer",
fontWeight:"700",
transition:"0.25s"
}}
>
{cat.toUpperCase()}
</button>

))}

</div>



{/* GRID */}

<div className="productGrid">

{filtered.map(product=>{

const out = isOut(product);

return(

<div key={product.id}

style={{
background:"linear-gradient(145deg,#0f1016,#0a0b10)",
padding:"22px",
borderRadius:"20px",
cursor:"pointer",
border:"1px solid rgba(255,122,0,.12)",
transition:"0.35s",
boxShadow:"0 10px 40px rgba(0,0,0,.8)"
}}

onMouseEnter={(e)=>{
e.currentTarget.style.boxShadow="0 40px 120px rgba(255,122,0,.18)";
e.currentTarget.style.transform="translateY(-12px)";
}}

onMouseLeave={(e)=>{
e.currentTarget.style.transform="translateY(0px)";
e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,.7)";
}}
>

<Link href={`/product/${product.id}`}>

<img
src={product.images?.[0] || product.image}
style={{
width:"100%",
height:"200px",
objectFit:"contain"
}}
/>

</Link>

<h3 style={{
color:"#fff",
marginTop:"14px",
fontSize:"18px"
}}>
{product.name}
</h3>

<p style={{
color:"#22c55e",
fontWeight:"700",
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
marginTop:"10px",
width:"100%",
padding:"12px",
borderRadius:"10px",
border:"none",
background:"linear-gradient(135deg,#FF7A00,#ff9a3d)",
color: out ? "#555" : "#02120a",
fontWeight:"800",
cursor: out ? "not-allowed" : "pointer"
}}
>

{out ? "Out of Stock":"Add To Cart"}

</button>

</div>

);

})}

</div>



{/* SIZE POPUP */}

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
padding:"35px",
borderRadius:"20px",
width:"480px",
maxWidth:"95%",
boxShadow:"0 60px 140px rgba(0,0,0,.9)",
border:"1px solid rgba(34,197,94,.15)"
}}>

<img
src={popupProduct.images?.[0] || popupProduct.image}
style={{
width:"100%",
borderRadius:"14px",
marginBottom:"12px"
}}
/>

<h2 style={{color:"white"}}>
{popupProduct.name}
</h2>

<p style={{
color:"#22c55e",
fontSize:"20px",
fontWeight:"700"
}}>
₹{popupProduct.price}
</p>

<h3 style={{color:"white"}}>Select Size</h3>

<div style={{
display:"flex",
flexWrap:"wrap",
gap:"10px",
marginBottom:"20px"
}}>

{Object.entries(popupProduct.sizes || {}).map(([size,stock]:any)=>{

const out = Number(stock) <= 0;

return(

<button
key={size}
disabled={out}
onClick={()=>setSelectedSize(size)}
style={{
padding:"12px 16px",
borderRadius:"10px",
border:selectedSize===size
? "2px solid #22c55e"
: "1px solid #333",
background:"linear-gradient(135deg,#FF7A00,#ff9a3d)",
color:"white",
cursor: out ? "not-allowed":"pointer"
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
image: popupProduct.images?.[0] || popupProduct.image || "",
size: selectedSize!
});

setPopupProduct(null);

}}
style={{
width:"100%",
padding:"16px",
background:selectedSize ? "linear-gradient(135deg,#FF7A00,#ff9a3d)": "#111",
border:"none",
borderRadius:"12px",
fontWeight:"800",
cursor:selectedSize ? "pointer":"not-allowed"
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
