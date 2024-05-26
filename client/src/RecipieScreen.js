import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";
import Button from 'react-bootstrap/Button';
import ErrorTemplate from "./template/ErrorTemplate";
import LoadingTemplate from "./template/LoadingTemplate";
import RecipieTemplate from "./template/RecipieTemplate";

function RecipieScreen() {
    const { categoryId, recipieId } = useParams()
    const { outputData, handlers } = useContext(RecipieContext)
    handlers.LoadRecipie(categoryId, recipieId)

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
            <>
            <RecipieTemplate recipie = { outputData.response } />
            <div>
            <Link to={`/deleteRecipie/${outputData.response.categoryId}/${outputData.response.id}`}>
            <Button variant="primary" size="sm" style={buttonStyle()}>Odstranit</Button>
            </Link>
            <Link to={`/addRecipieScreen/${outputData.response.categoryId}/${outputData.response.id}`}>
            <Button variant="primary" size="sm" style={buttonStyle()}>Upravit</Button>
            </Link>
            </div>
            {outputData.response = null}
            </>
        )
    }
}

function buttonStyle() {
    return {
        margin: "0px 5px 0px 0px",
    }
}

export default RecipieScreen;