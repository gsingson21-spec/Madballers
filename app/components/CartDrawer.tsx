'use client';

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, setOpen }: any) {

  const { cart, removeFromCart } = useCart();

  const drawerRef = useRef<any>(null);
  const pathname = usePathname();

  /* CLOSE WHEN ROUTE CHANGES */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* CLOSE WHEN CLICK OUTSIDE */
  useEffect(() => {

    function handleClick(e: any) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (

    <div
      ref={drawerRef}
      style={{
        position: "fixed",
        top: 0,
        right: open ? "0px" : "-420px",
        width: "420px",
        maxWidth: "100%",
        height: "100vh",
        background: "#0b0d11",
        transition: "0.3s",
        padding: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column"
      }}
    >

      <h2 style={{ color: "white" }}>Your Cart</h2>

      <div style={{ flex: 1, overflowY: "auto" }}>

        {cart.length === 0 && (
          <p style={{ color: "#aaa" }}>Your cart is empty</p>
        )}

        {cart.map((item, index) => (

          <div key={index} style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px"
          }}>

            <img
              src={item.image}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <div style={{ flex: 1 }}>
              <p style={{ color: "white", margin: 0 }}>
                {item.name}
              </p>

              <p style={{ color: "#9ca3af", margin: 0 }}>
                Size: {item.size}
              </p>

              <p style={{ color: "#9ca3af", margin: 0 }}>
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => removeFromCart(index)}
              style={{
                background: "red",
                border: "none",
                color: "white",
                borderRadius: "6px",
                padding: "6px"
              }}
            >
              X
            </button>

          </div>

        ))}

      </div>

      <h3 style={{ color: "white" }}>
        Total: ₹{total}
      </h3>

      <a href="/checkout">
        <button style={{
          width: "100%",
          padding: "14px",
          background: "#22c55e",
          border: "none",
          borderRadius: "10px",
          fontWeight: "700",
          cursor: "pointer"
        }}>
          Checkout
        </button>
      </a>

    </div>
  );
}
