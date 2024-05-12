import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CategoryContext } from "./CategoryContext";
import { Link } from "react-router-dom";

function RandomSelectScreen() {
    const [value, setValue] = useState(null)
    const categories = useContext(CategoryContext)

    return (
        <div>
            <h3>Náhodný výběr receptu</h3>
            <Form.Select aria-label="Default select example" onChange={(e) => setValue(e.target.value)}>
                <option>Vyberte kategorii</option>
                {categories.map((category) =>
                    <option value={category.id}>{category.title}</option>
                )}
            </Form.Select>
            <Link to={`/randomRecipie/${value}`}>
            <Button variant="primary" disabled={!value} >Vyhledat náhodný recept</Button>{' '}
            </Link>
        </div>
    )
}

export default RandomSelectScreen