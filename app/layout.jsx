'use client'
import "bootstrap/dist/css/bootstrap.min.css";
import './globals.css'
import { useEffect } from 'react';
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";


export default function RootLayout({ children }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="ar">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <head />
      <body >
        <div className="grid-nav">
          <div className="logo-container">
            <p className="hehe">hehe</p>
            <a href="/" className="logo-link">
              <img src="/assets/logo.svg" alt="logo" className="logo-main" />
              <span>Anime Sekai</span>
            </a>
          </div>
          <div>
            <div className="page">
              <SearchBar className="search-bar page-layout"></SearchBar>
            </div>
            {children}
          </div>
        </div>
      </body>
      <Footer></Footer>

    </html >
  )
}
