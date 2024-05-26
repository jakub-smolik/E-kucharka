import Card from 'react-bootstrap/Card';

function RecipieTemplate(props) {
    return (
        <div>
            <Card>
                <Card.Header>{`Recept byl vytvořen ${props.recipie.date}`}</Card.Header>
                <Card.Body>
                    <Card.Title>{props.recipie.title}</Card.Title>
                    <Card.Text>
                        <div>
                            <h6>Ingredience</h6>
                            <p>{props.recipie.ingredients}</p>
                        </div>
                    </Card.Text>
                    <Card.Text>
                    <div>
                        <h6>Postup</h6>
                        <p>{props.recipie.process}</p>
                    </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RecipieTemplate;