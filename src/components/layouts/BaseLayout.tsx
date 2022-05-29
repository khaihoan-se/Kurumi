import React from "react";
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

const BaseLayout = ({ children }) => {
    return (
        <main>
            <Header />
            <div className="app">{children}</div>
            <Footer />
        </main>
    )
}

export default BaseLayout;