'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCart } from "@/app/context/CartContext";

export default function ProductPage(){

const { id } = useParams();
const [product,setProduct] = useState<any>(null);
const [selectedSize,setSelectedSize] = useState<string | null>(null);
const [currentImage, setCurrentImage] = useState(0);
const intervalRef = useRef<NodeJS.Timeout | null>(null);
const startInterval = () => {

if(intervalRef.current) return;

intervalRef.current = setInterval(() => {

setCurrentImage(prev =>
prev === product.images.length - 1 ? 0 : prev + 1
);

}, 2500);

};

const stopInterval = () => {

if(intervalRef.current){
clearInterval(intervalRef.current);
intervalRef.current = null;
}

};
const { addToCart } = useCart();

/* FETCH PRODUCT */

useEffect(()=>{

async function loadProduct(){

if(!id) return;

const ref = doc(db,"products",id as string);
const snap = await getDoc(ref);

if(snap.exists()){
setProduct({
id:snap.id,
...snap.data()
});
}

}

loadProduct();

},[id]);

useEffect(() => {
  if (!product?.images?.length) return;

  const interval = setInterval(() => {
    setCurrentImage(prev =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  }, 2500); // change speed here (2500 = 2.5 sec)

  return () => clearInterval(interval);
}, [product]);

useEffect(()=>{

if(product?.images?.length > 1){
startInterval();
}

return stopInterval;

},[product]);

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
Loading Nuclear Product...
</div>
);

}

return(

<div style={{
background:"#000",
minHeight:"100vh",
paddingTop:"120px",
paddingInline:"6vw"
}}>

{/* PRODUCT GRID */}

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"60px",
alignItems:"center"
}}>

{/* IMAGE */}

<img
  src={product?.images?.[currentImage] || product?.images?.[0]}
  style={{
    width: "100%",
    height: "520px",
    objectFit: "contain",
    transition: "all 1.2s cubic-bezier(.22,1,.36,1)"
  }}
/>

<div
onMouseEnter={stopInterval}
onMouseLeave={startInterval}
/>

{/* INFO */}

<div>

<h1 style={{
color:"white",
fontSize:"42px",
fontWeight:"900"
}}>
{product.name}
</h1>

<p style={{
color:"#ff7a00",
fontSize:"28px",
fontWeight:"900"
}}>
₹{product.price}
</p>


{/* SIZES */}

<h3 style={{color:"white",marginTop:"30px"}}>
Select Size
</h3>

<div style={{
display:"flex",
gap:"12px",
flexWrap:"wrap",
margin:"20px 0"
}}>

{Object.entries(product.sizes || {}).map(([size,stock]: any)=>{

const out = Number(stock)<=0;

return(

<button
key={size}
disabled={out}
onClick={() => {!out && setSelectedSize(size)}}
style={{

padding:"14px 18px",
borderRadius:"14px",

border:selectedSize === size
? "2px solid #ff7a00"
: out
? "1px solid #333"
: "1px solid tgba(255,255,255,.15)",

background:selectedSize === size
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: out
? "#0a0a0a"
: "#111",

color: out ? "#555" : "white",

cursor: out ? "not-allowed" : "pointer",

opacity: out ? 0.45 : 1,

position:"relative",
fontWeight:"800",
letterSpacing:".5px"

}}
>

{size}

{/* OUT OF STOCK TAG */}

{out && (
<span style={{
position:"absolute",
top:"-6px",
right:"-6px",
fontSize:"10px",
background:"#ff2d00",
padding:"2px 6px",
borderRadius:"6px",
fontWeight:"900"
}}>
OUT
</span>
)}

</button>

);

})}

</div>


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
padding:"18px",
borderRadius:"16px",
border:"none",
background:selectedSize
? "linear-gradient(90deg,#ff7a00,#ffb347)"
: "#222",
color:"#000",
fontWeight:"900",
fontSize:"18px",
opacity: !selectedSize ? 0.5 : 1,
cursor: !selectedSize ? "not-allowed" : "pointer"
}}
>
Add To Cart
</button>

</div>

</div>

</div>
);
}
