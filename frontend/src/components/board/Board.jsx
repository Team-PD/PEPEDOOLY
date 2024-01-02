import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "../page/board/List";
import Create from "../page/board/Create";
import Modify from "../page/board/Modify";
import View from "../page/board/View";
import Header from "../Layout/Header";
// import Footer from "../Layout/Footer";

export default function Board() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="create" element={<Create />} />
                <Route path="modify/:id" element={<Modify />} />
                <Route path="view/:id" element={<View />} />
            </Routes>
            {/* <Footer /> */}
        </div>
    );
}
