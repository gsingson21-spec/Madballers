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
}
