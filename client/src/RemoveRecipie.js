import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";
import LoadingTemplate from "./template/LoadingTemplate";
import ErrorTemplate from "./template/ErrorTemplate";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function RemoveRecipie() {
    const {categoryId, recipieId} = useParams()
    const {outputData, handlers} = useContext(RecipieContext);
    const recipie = {categoryId: categoryId, recipieId: recipieId};
    handlers.DeleteRecipie(recipie)
    
    if (outputData.status === "loading") {
        return (
            <LoadingTemplate />
        )
    } else if (outputData.status === "error") {
        return (
            <ErrorTemplate />
        )
    } else if (outputData.status === "ready") {
        return (
            <div style={containerStyle()}>
                <div style={successStyle()}>
                <h6>Záznam odstraněn</h6>
                <p>Vámi zvolený recept byl úspěšně odstraněn z úložiště.</p>
                </div>
                <Link to={`/recipieList/${recipie.categoryId}`}>
                    <Button variant="primary" size="sm">Zpět do kategorie receptů</Button>
                </Link>
            </div>
        )
    }
}

function successStyle() {
    return {
        border: "2px solid green",
        backgroundColor: "lightgreen",
        margin: "10px 5%",
        padding: "20px 0px",
        borderRadius: "5px",
    }
}

function containerStyle() {
    return {
        textAlign: "center",
    }
}

export default RemoveRecipie