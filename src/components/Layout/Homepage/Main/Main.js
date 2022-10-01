import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

import { db, auth, functions } from "../../../../Config/Firebase";
import Article from "../../../AritclesManager/Article/Article";
import AuthContext from "../../../store/auth-context";

const articlesDatabase = collection(db, "Article");

const Main = (props) => {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const authContext = useContext(AuthContext);

  const getAllActicles = () => {
    getDocs(query(articlesDatabase, orderBy("createDate", "desc")))
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          let allArticles = [];
          snapshot.docs.forEach((doc) => {
            allArticles.push({ id: doc.id, ...doc.data() });
          });
          setArticles(allArticles);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const observeHandler = () => {
    setIsLoaded(false);
  };

  useEffect(() => {
    // onSnapshot(articlesDatabase, (snapshot) => {
    //   if (snapshot.docs.length > 0) {
    //     let allArticles = [];
    //     snapshot.docs.forEach((doc) => {
    //       const article = { id: doc.id, ...doc.data() };
    //       allArticles.push(article);
    //     });
    //     setArticles(allArticles);
    //     setIsLoaded(true);
    //   }
    // });
    getAllActicles();
  }, [articlesDatabase, isLoaded]);

  return (
    <div>
      {articles.map((article, index) => (
        <ul key={article.id}>
          <Article data={article} index={index} reload={observeHandler} />
        </ul>
      ))}
    </div>
  );
};

export default Main;
