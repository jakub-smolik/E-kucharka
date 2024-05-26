import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";
import LoadingTemplate from "./template/LoadingTemplate";
import ErrorTemplate from "./template/ErrorTemplate";
import RecipieTemplate from "./template/RecipieTemplate";

function RandomRecipieScreen() {
    const { categoryId } = useParams()
    const { outputData, handlers } = useContext(RecipieContext)
    handlers.LoadRandomRecipie(categoryId)
    
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
            { outputData.response.id 
                ? <RecipieTemplate recipie = { outputData.response } /> 
                : <p>Zvolená kategorie neobsahuje žádné recpty.</p> }
            {outputData.response = null}
            </>
        )
    }
}

export default RandomRecipieScreen