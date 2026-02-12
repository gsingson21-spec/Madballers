"use client";
import { useEffect, useState } from "react";

export default function Loader(){

const [hide,setHide] = useState(false);

useEffect(()=>{
setTimeout(()=>{
setHide(true);
},1800);
},[]);

if(hide) return null;

return(

<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"#0B0F1A",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:99999
}}>

<img
src="/logo.png"
style={{
width:"160px",
animation:"zoom 1.6s ease"
}}
/>

<style jsx>{`
@keyframes zoom{
0%{transform:scale(.6);opacity:0}
100%{transform:scale(1);opacity:1}
}
`}</style>

</div>
);
}