import React, { useContext, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CategoryContext } from "./CategoryContext";
import { RecipieContext } from "./RecipieContext";
import { useParams } from "react-router-dom";

function AddRecipieScreen() {
    const categories = useContext(CategoryContext)
    const {categoryId, recipieId} = useParams();
    const {outputData, handlers} = useContext(RecipieContext);
    if (categoryId && recipieId) {
        handlers.LoadRecipie(categoryId, recipieId)
    }
    
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            let formData = Object.fromEntries(new FormData(e.target));
            const response = await fetch(`http://localhost:3000/recipie/${categoryId && outputData && outputData.id ? "update" : "create"}`, 
            {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(formData)});
            const responseJson = await response.json();
        }}>
        <Form.Group className="mb-3" controlId="id">
            <Form.Control type="hidden" name="id" defaultValue={categoryId&&outputData&&outputData.id ? outputData.id : ""}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="id">
            <Form.Control type="hidden" name="date" defaultValue={categoryId&&outputData&&outputData.date ? outputData.date : ""}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="title">
            <Form.Label>Název</Form.Label>
            <Form.Control type="text" name="title" required defaultValue={categoryId&&outputData&&outputData.title ? outputData.title : ""}/>
        </Form.Group>
        <Form.Select aria-label="Default select example" name="categoryId" defaultValue={categoryId&&outputData&&outputData.categoryId ? outputData.categoryId : ""}>
                <option>Vyberte kategorii</option>
                {categories.map((category) =>
                    <option value={category.id}>{category.title} </option>
                )}
            </Form.Select>
        <Form.Group className="mb-3" controlId="ingredients">
            <Form.Label>Ingredience</Form.Label>
            <Form.Control as="textarea" name="ingredients" required rows={3} defaultValue={categoryId&&outputData&&outputData.ingredients ? outputData.ingredients : ""}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="process">
            <Form.Label>Postup</Form.Label>
            <Form.Control as="textarea" name="process" required rows={3} defaultValue={categoryId&&outputData&&outputData.process ? outputData.process : ""}/>
        </Form.Group>
        <Button variant="primary" type="submit">{categoryId&&recipieId ? "Upravit" : "Uložit"}</Button>{' '}
        </Form>
    )
}

export default AddRecipieScreen