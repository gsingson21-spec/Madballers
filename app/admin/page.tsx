'use client';

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function AdminPage(){

const bootSizes = ["6","6.5","7","7.5","8","8.5","9","9.5","10","10.5","11"];
const jerseySizes = ["S","M","L","XL"];
const gloveSizes = ["7","8","9","10"];
const jacketSizes = ["S","M","L","XL"];
const ballSizes = ["3","4","5"];
const [featured, setFeatured] = useState(false);
const [image,setImage] = useState("");
const [name,setName] = useState("");
const [category,setCategory] = useState("boots");
const [price,setPrice] = useState("");
const [sizes,setSizes] = useState(
  Object.fromEntries(bootSizes.map(size => [size,""]))
);

useEffect(() => {

 let selectedSizes = bootSizes;

 if(category === "jerseys") selectedSizes = jerseySizes;
 if(category === "gloves") selectedSizes = gloveSizes;
 if(category === "jackets") selectedSizes = jacketSizes;
 if(category === "balls") selectedSizes = ballSizes;

 setSizes(
   Object.fromEntries(selectedSizes.map(size => [size, ""]))
 );

}, [category]);


async function addProduct(){

if(!name || !price){
alert("Fill all fields!");
return;
}

await addDoc(collection(db,"products"),{
name,
price:Number(price),
category,
image,
sizes:Object.fromEntries(
  bootSizes.map(size=>[
    size,
    Number(sizes[size]) || 0
  ])
),
featured,
createdAt: new Date()
});

alert("✅ Product Added!");

setName("");
setPrice("");
setImage("");
setCategory("");
setSizes(
  Object.fromEntries(
    bootSizes.map(size => [size,""])
  )
);
}

return(

<div style={{padding:"40px"}}>

<h1>OWNER DASHBOARD</h1>

<div style={{
display:"flex",
flexDirection:"column",
gap:"10px",
maxWidth:"400px"
}}>

<input
placeholder="Product Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
style={{
background:"#111",
color:"#fff",
padding:"10px",
borderRadius:"8px",
border:"1px solid rgba(255,255,255,0.1)",
outline:"none",
width:"100%"
}}
>

<option value="">Select Category</option>
<option value="boots">Boots</option>
<option value="jerseys">Jerseys</option>
<option value="gloves">Gloves</option>
<option value="jackets">Jackets</option>
<option value="balls">Balls</option>
<option value="gear">Gear & Essentials</option>

</select>

<input
placeholder="Price"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<input
placeholder="Image URL"
value={image}
onChange={(e)=>setImage(e.target.value)}
/>

<label style={{color:"white"}}>
<input
type="checkbox"
checked={featured}
onChange={(e)=>setFeatured(e.target.checked)}
/>
 Featured Product
</label>

<h3>Sizes</h3>

{/* BOOTS */}
{category === "boots" && bootSizes.map((size) => (
  <input
    key={size}
    placeholder={`Size ${size} stock`}
    value={sizes[size] || ""}
    onChange={(e) =>
      setSizes({ ...sizes, [size]: e.target.value })
    }
  />
))}

{/* JERSEYS */}
{category === "jerseys" && jerseySizes.map((size) => (
  <input
    key={size}
    placeholder={`Size ${size} stock`}
    value={sizes[size] || ""}
    onChange={(e) =>
      setSizes({ ...sizes, [size]: e.target.value })
    }
  />
))}

{/* GLOVES */}
{category === "gloves" && gloveSizes.map((size) => (
  <input
    key={size}
    placeholder={`Size ${size} stock`}
    value={sizes[size] || ""}
    onChange={(e) =>
      setSizes({ ...sizes, [size]: e.target.value })
    }
  />
))}

{/* JACKETS */}
{category === "jackets" && jacketSizes.map((size) => (
  <input
    key={size}
    placeholder={`Size ${size} stock`}
    value={sizes[size] || ""}
    onChange={(e) =>
      setSizes({ ...sizes, [size]: e.target.value })
    }
  />
))}

{/* BALLS */}
{category === "balls" && ballSizes.map((size) => (
  <input
    key={size}
    placeholder={`Size ${size} stock`}
    value={sizes[size] || ""}
    onChange={(e) =>
      setSizes({ ...sizes, [size]: e.target.value })
    }
  />
))}

<button onClick={addProduct}>
Add Product
</button>

</div>

</div>
);
}
