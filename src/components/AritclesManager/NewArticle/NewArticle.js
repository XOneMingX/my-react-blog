import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  NavDropdown,
  Form,
  Button,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../../../Config/Firebase";
import AuthContext from "../../store/auth-context";

const articlesDatabase = collection(db, "Article");

const NewArticle = () => {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [article, setArticle] = useState({
    title: "",
    content: "",
    createDate: new Date(),
    isPublish: false,
    lastModified: new Date(),
    createUserID: "",
  });

  const titleChangeHandler = (event) => {
    setArticle({ ...article, title: event.target.value });
  };

  const contentChangeHandler = (value) => {
    console.log(value);
    setArticle({ ...article, content: value });
  };

  const publishStateChangeHandler = (event) => {
    setArticle({ ...article, isPublish: event.target.value === "True" });
  };

  const AddArticleHandler = (event) => {
    event.preventDefault();
    if (
      article.title.trim().length === 0 ||
      article.content.trim().length === 0
    ) {
      alert("Plz enter title and content");
      return;
    } else {
      addDoc(articlesDatabase, article).then(() => {
        navigate("/");
      });
    }
  };

  if (authContext.isAdmin) {
    return (
      <Container>
        <Row>
          <Col lg={10}>
            <InputGroup>
              <Form.Label>
                <h2>Title</h2>
              </Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  id="title"
                  type="text"
                  value={article.title}
                  onChange={titleChangeHandler}
                />
              </InputGroup>
            </InputGroup>
            <FormGroup>
              <ReactQuill
                value={article.content}
                onChange={contentChangeHandler}
              />
            </FormGroup>
          </Col>
          <Col lg={2}>
            <Form>
              <FormGroup className="mb-3">
                <Form.Label>isPublish</Form.Label>
                <Form.Select onChange={publishStateChangeHandler}>
                  <option>False</option>
                  <option>True</option>
                </Form.Select>
              </FormGroup>
              <Button type="submit" onClick={AddArticleHandler}>
                Sumbit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default NewArticle;
