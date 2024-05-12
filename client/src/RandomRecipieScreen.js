import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipieContext } from "./RecipieContext";
import Card from 'react-bootstrap/Card';

function RandomRecipieScreen() {
    const { categoryId } = useParams()
    const { outputData, handlers } = useContext(RecipieContext)
    handlers.LoadRandomRecipie(categoryId)
    let recipie = outputData
    console.log(recipie)
    if (recipie) {
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
    } else {
        return (
            <div>
                <p>Ve zvolené kategorii nejsou záznamy pro výběr.</p>
            </div>
        )
    }
}

export default RandomRecipieScreen