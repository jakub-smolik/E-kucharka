import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";

function MainScreen(props) {
    // const categories = props.categories;
    const categories = useContext(CategoryContext)
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Link to={`/addRecipieScreen`}>
                <Button variant="primary" size="sm" style={buttonStyle() }>
                    Přidat nový recept
                </Button>
                </Link>
                <Link to={`/randomSelect`}>
                <Button variant="primary" size="sm" style={buttonStyle() }>
                    Náhodný tip
                </Button>
                </Link>
            </div>

            <h4>Kategorie recptů</h4>

            <ListGroup>
                {categories.map((category) => 
                    <Link to={`/recipieList/${category.id}`} style={{textDecoration:"none"}}>
                        <ListGroup.Item style={listStyle()}>
                            {category.title}
                        </ListGroup.Item>
                    </Link>
                )}
            </ListGroup>
        </div>
    )
}

function listStyle() {
    return {
        backgroundColor: "#f7f8fa",
        margin: "2px 0px",
        borderRadius: "5px",
    }
}

function buttonStyle() {
    return {
        margin: "0px 10px",
    }
}

export default MainScreen;