import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { doc, deleteDoc, collection } from "firebase/firestore";

import { db } from "../../../Config/Firebase";
import AuthContext from "../../store/auth-context";

export function timeStampToString(ts) {
  const date = new Date(ts * 1000);
  return (
    date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
  );
}

const Article = (props) => {
  const authContext = useContext(AuthContext);

  const delArticleFromDatabse = (e) => {
    e.preventDefault();
    const docRef = doc(db, "Article", props.data.id);
    deleteDoc(docRef);
    props.reload();
  };

  return (
    <div>
      <div>
        {props.index + 1})
        <Link to={"article/" + props.data.id} state={{ article: props.data }}>
          {`${props.data.title}`}
        </Link>
        {timeStampToString(props.data.createDate.seconds)}
        {authContext.isAdmin ? (
          <div>
            {" "}
            <button onClick={delArticleFromDatabse}>Del</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Article;
