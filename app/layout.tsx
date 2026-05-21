<<<<<<< HEAD
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MAD BALLERS — BALLER ZONE',
  description: 'Premium Football Culture. Boots. Jerseys. Essentials. Order on WhatsApp.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  )
=======
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Mad Ballers",
  description: "Elite Sports Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

return (
<html lang="en">
<body style={{
  margin:0,
  background:"var(--card)",
  fontFamily:"system-ui"
}}>

<CartProvider>

<Navbar />

{children}

</CartProvider>

</body>
</html>
);
>>>>>>> 769c39e1785d2da330563b039f16b56d73b538aa
}
