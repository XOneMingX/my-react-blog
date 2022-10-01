import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "../Layout/Homepage/Main/Main";
import ViewArticle from "../AritclesManager/ViewArticle/ViewArticle";
import NewArticle from "../AritclesManager/NewArticle/NewArticle";
import AdminManager from "../AdminManager/AdminManager";

const RouterManager = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/article/:id" element={<ViewArticle />} />
      <Route path="/new-article" element={<NewArticle />} />
      <Route path="/admin-manager" element={<AdminManager />} />
    </Routes>
  );
};

export default RouterManager;
