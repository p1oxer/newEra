import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function MainLayout() {
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
