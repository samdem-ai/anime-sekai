'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css'
import { useEffect } from 'react';
import Footer from "../components/Footer";


export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>
      <Footer></Footer>
    </html>
  )
}
