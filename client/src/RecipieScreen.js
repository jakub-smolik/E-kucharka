import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { RecipieContext } from "./RecipieContext";
import Card from 'react-bootstrap/Card';

function RecipieScreen() {
    const { categoryId, recipieId } = useParams()
    const { outputData, handlers } = useContext(RecipieContext)
    handlers.LoadRecipie(categoryId, recipieId)
    const recipie = outputData

    return (
        <div>
            <Card>
                <Card.Header>{`Recept byl vytvořen ${recipie.date}`}</Card.Header>
                <Card.Body>
                    <Card.Title>{recipie.title}</Card.Title>
                    <Card.Text>
                        <div>
                            <h6>Ingredience</h6>
                            <p>{recipie.ingredients}</p>
                        </div>
                    </Card.Text>
                    <Card.Text>
                    <div>
                        <h6>Postup</h6>
                        <p>{recipie.process}</p>
                    </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RecipieScreen;