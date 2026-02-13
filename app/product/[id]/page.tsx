'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "@/app/context/CartContext";
import { Product } from "@/types/Product";

export default function ProductPage(){

const { id } = useParams();
const { addToCart } = useCart();

const [product,setProduct] = useState<Product | null>(null);
const [selectedSize,setSelectedSize] = useState<string | null>(null);
const [activeImage,setActiveImage] = useState(0);

/* FETCH SINGLE PRODUCT */

useEffect(()=>{

async function load(){

const ref = doc(db,"products",id as string);
const snap = await getDoc(ref);

if(snap.exists()){
setProduct({
id:snap.id,
...snap.data()
} as Product);
}

}

load();

},[id]);


if(!product){
return(
<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#000",
color:"white",
fontSize:"24px"
}}>
Loading Product...
</div>
);
}


return(

<div style={{
background:"#000",
minHeight:"100vh",
padding:"120px 7vw 80px",
color:"white"
}}>

{/* MAIN GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"1.2fr 1fr",
gap:"60px",
alignItems:"start"
}}>


{/* 🔥 IMAGE SECTION */}

<div>

{/* BIG IMAGE */}

<div style={{
background:"#050505",
borderRadius:"28px",
padding:"40px",
border:"1px solid #111"
}}>

<img
src={product.images?.[activeImage]}
style={{
width:"100%",
height:"520px",
objectFit:"contain"
}}
/>

</div>


{/* THUMBNAILS */}

<div style={{
display:"flex",
gap:"14px",
marginTop:"18px"
}}>

{product.images?.map((img,i)=>(

<img
key={i}
src={img}
onClick={()=>setActiveImage(i)}
style={{
width:"90px",
height:"90px",
objectFit:"cover",
borderRadius:"14px",
cursor:"pointer",
border: activeImage===i
? "2px solid #ff7a00"
: "1px solid #111"
}}
/>

))}

</div>

</div>



{/* 🔥 BUY SECTION */}

<div style={{
position:"sticky",
top:"140px"
}}>

<h1 style={{
fontSize:"44px",
fontWeight:"900",
letterSpacing:"-1px"
}}>
{product.name}
</h1>


<p style={{
fontSize:"34px",
color:"#ff7a00",
fontWeight:"900",
margin:"10px 0 30px"
}}>
₹{product.price}
</p>


{/* SIZE */}

<h3 style={{marginBottom:"10px"}}>
Select Size
</h3>

<div style={{
display:"flex",
flexWrap:"wrap",
gap:"12px",
marginBottom:"30px"
}}>

{Object.entries(product.sizes || {}).map(([size,stock]:any)=>{

const out = Number(stock) <= 0;

return(

<button
key={size}
disabled={out}
onClick={()=>setSelectedSize(size)}
style={{
padding:"14px 20px",
borderRadius:"12px",
border:selectedSize===size
? "2px solid #ff7a00"
: "1px solid #222",
background:selectedSize===size
? "#ff7a00"
: "#050505",
color:selectedSize===size
? "#000"
: "#fff",
cursor: out ? "not-allowed":"pointer",
fontWeight:"700",
transition:".25s"
}}
>
{size}
</button>

);

})}

</div>



{/* ADD TO CART */}

<button
disabled={!selectedSize}
onClick={()=>{

addToCart({
id:product.id,
name:product.name,
price:product.price,
image:product.images?.[0] || "",
size:selectedSize!
});

}}
style={{
width:"100%",
padding:"20px",
borderRadius:"16px",
border:"none",
fontSize:"18px",
fontWeight:"900",
letterSpacing:"1px",
cursor:"pointer",

background:selectedSize
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: "#222",

color:selectedSize ? "#000":"#666",

boxShadow:selectedSize
? "0 20px 60px rgba(255,122,0,.35)"
: "none",

transition:"0.3s"
}}
>
ADD TO CART
</button>


{/* TRUST */}

<div style={{
marginTop:"30px",
opacity:.7,
fontSize:"14px",
lineHeight:"26px"
}}>
✅ Ships across India <br/>
🔥 Premium Quality Gear <br/>
⚡ Fast Dispatch
</div>

</div>

</div>

</div>

);
}
