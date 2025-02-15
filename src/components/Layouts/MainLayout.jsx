import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import ScrollToTop from "../UI/ScrollToTop";

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
