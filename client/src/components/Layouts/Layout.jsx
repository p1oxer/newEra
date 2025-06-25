import React from "react";
import Header from "../Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
    return (
        <>
            <div className="wrapper">
                <ScrollRestoration />
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}
