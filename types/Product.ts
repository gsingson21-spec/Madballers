export type Product = {
id:string;
name:string;
price:number;
image?:string;
images?:string[];
category:string;
sizes?:Record<string,number>;
featured?:boolean;
selectedSize?:string;
};