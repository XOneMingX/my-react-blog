import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connectFirestoreEmulator, doc, onSnapshot } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import classes from "./ViewArticle.module.css";
import { timeStampToString } from "../Article/Article";
import { db } from "../../../Config/Firebase";

const ViewArticle = (props) => {
  const [article, setArticle] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const location = useLocation();
  const articleID = useParams();
  const parser = new DOMParser();
  let navigate = useNavigate();

  const getArticle = () => {
    if (typeof location.state !== "undefined" && location.state !== null) {
      if (location.state.hasOwnProperty("article")) {
        setArticle(location.state.article, setIsLoaded(true));
      }
    } else {
      getArticleByID(articleID.id);
    }
  };

  const getArticleByID = (aid) => {
    onSnapshot(doc(db, "Article", aid), (doc) => {
      console.log(doc);
      if (doc.exists()) {
        setArticle(doc.data(), setIsLoaded(true));
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    getArticle();
  }, [location]);

  if (isLoaded) {
    return (
      <div>
        <div className={classes.article}>
          <div className={classes.articleInfo}>
            <div className={classes.title}>{article.title}</div>
            <div className={classes.date}>
              {timeStampToString(article.createDate.seconds)}
            </div>
            <div className={classes.articleMain}>{parse(article.content)}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default ViewArticle;
