import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";
import ErrorTemplate from "./template/ErrorTemplate";
import LoadingTemplate from "./template/LoadingTemplate";

function RecipieListScreen() {
    const { outputData, handlers } = useContext(RecipieContext)
    const { category } = useParams()
    handlers.LoadRecipieList(category);

    if (outputData.status === "loading" || ! outputData.response) {
        return (
            <LoadingTemplate />
        )
    } else if (outputData.status === "error") {
        return (
            <ErrorTemplate errorMessage = { outputData.response } />
        )
    } else if (outputData.status === "ready") {
        return (
            <div>
            {outputData.response.length === 0 ? "Tato kategorie neopsahuje žádné recepty." : <h3>Kategorie recptů</h3>}
            {outputData.response.map((recipie) => 
                <Card style={cardStyle()}>
                    <Card.Header>{`Recept byl vytvořen ${recipie.date}`}</Card.Header>
                    <Card.Body>
                        <Card.Title>{recipie.title}</Card.Title>
                        <Link to={`/recipie/${recipie.categoryId}/${recipie.id}`} style={{textDecoration:"none"}}>
                        <Button variant="primary" size="sm" style={buttonStyle()}>Otevřít</Button>
                        </Link>
                        <Link to={`/deleteRecipie/${recipie.categoryId}/${recipie.id}`}>
                        <Button variant="primary" size="sm" style={buttonStyle()}>Odstranit</Button>
                        </Link>
                        <Link to={`/addRecipieScreen/${recipie.categoryId}/${recipie.id}`}>
                        <Button variant="primary" size="sm" style={buttonStyle()}>Upravit</Button>
                        </Link>
                    </Card.Body>
                    </Card>      
            )}


            {outputData.response = null}
            </div>
        )
    }
}

function cardStyle() {
    return {
        margin: "10px 0px",
    }
}

function buttonStyle() {
    return {
        margin: "0px 5px 0px 0px",
    }
}

export default RecipieListScreen;