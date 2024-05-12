import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";

function RemoveRecipie() {
    const {categoryId, recipieId} = useParams();
    const {outputData, handlers} = useContext(RecipieContext);
    const recipie = {categoryId: categoryId, recipieId: recipieId};
    console.log(recipie);
    handlers.DeleteRecipie(recipie)
}

export default RemoveRecipie