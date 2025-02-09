import React from "react";
import Header from "../Header/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../Footer/Footer";
import Breadcrumbs from "../Breadcrumbs";
import ScrollToTop from "../UI/ScrollToTop";

export default function Layout() {
    return (
        <>
            <div className="wrapper">
                <ScrollRestoration />
                <ScrollToTop />
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
}
