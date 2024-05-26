import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CategoryContext } from "./CategoryContext";
import { RecipieContext } from "./RecipieContext";
import { useParams, Link } from "react-router-dom";
import RecipieTemplate from "./template/RecipieTemplate";

function AddRecipieScreen() {
    const [newRecipie, setNewRecipie] = useState({
        recipie: null,
        success: true,
    });
    const categories = useContext(CategoryContext)
    const {categoryId, recipieId} = useParams();
    const {outputData, handlers} = useContext(RecipieContext);


    if (categoryId && recipieId) {
        handlers.LoadRecipie(categoryId, recipieId);
    }

    if (newRecipie.recipie === null) {
        return (
            <>
            <div style={ newRecipie.success === false ? errorStyle() : hiddenStyle() }>
                <h6>Něco se pokazilo. Zkontrolujte zadaná data a opakujte znovu.</h6>
            </div>
        
            <Form onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                let formData = Object.fromEntries(new FormData(e.target));
                const response = await fetch(`http://localhost:3000/recipie/${outputData.response && outputData.response.id ? "update" : "create"}`, 
                {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(formData)});
                const responseJson = await response.json();

                if (response.status === 200) {
                    outputData.response = null;
                    setNewRecipie({recipie: responseJson, success: true});
                } else {
                    setNewRecipie({recipie: null, success: false});
                }
            }}>
            
            <Form.Group className="mb-3" controlId="id">
                <Form.Control type="hidden" name="id" defaultValue={outputData.response && outputData.response.id ? outputData.response.id : ""}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="id">
                <Form.Control type="hidden" name="date" defaultValue={outputData.response && outputData.response.date ? outputData.response.date : ""}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Název</Form.Label>
                <Form.Control type="text" name="title" required defaultValue={outputData.response && outputData.response.title ? outputData.response.title : ""}/>
            </Form.Group>
            <Form.Select aria-label="Default select example" name="categoryId" defaultValue={outputData.response &&outputData.response.categoryId ? outputData.response.categoryId : ""}>
                    <option>Vyberte kategorii</option>
                    {categories.map((category) =>
                        <option value={category.id}>{category.title} </option>
                    )}
                </Form.Select>
            <Form.Group className="mb-3" controlId="ingredients">
                <Form.Label>Ingredience</Form.Label>
                <Form.Control as="textarea" name="ingredients" maxLength="200" required rows={3} defaultValue={outputData.response && outputData.response.ingredients ? outputData.response.ingredients : ""}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="process">
                <Form.Label>Postup</Form.Label>
                <Form.Control as="textarea" name="process" maxLength="500" required rows={3} defaultValue={outputData.response && outputData.response.process ? outputData.response.process : ""}/>
            </Form.Group>
            <Button variant="primary" type="submit">{categoryId&&recipieId ? "Upravit" : "Uložit"}</Button>{' '}
            <Link to={`/`}>
            <Button variant="secondary" onClick={outputData.response = null}>
                Storno
            </Button>
            </Link>
            </Form>
            </>
        )
    } else {
        return (
            <>
            <div style={ successStyle() }>
                <h6>Recept byl úspěšně uložen.</h6>
            </div>
            <RecipieTemplate recipie = { newRecipie.recipie } />
            </>
        )
    }
}

function successStyle() {
    return {
        border: "2px solid green",
        backgroundColor: "lightgreen",
        borderRadius: "5px",
        margin: "10px 5%",
        textAlign: "center",
    }
}

function errorStyle() {
    return {
        border: "2px solid red",
        backgroundColor: "pink",
        borderRadius: "5px",
        margin: "10px 5%",
        textAlign: "center",
    }
}

function hiddenStyle() {
    return {
        display: "none",
    }
}

export default AddRecipieScreen