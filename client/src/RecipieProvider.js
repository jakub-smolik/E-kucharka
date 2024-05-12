import { useEffect, useState } from "react";
import { RecipieContext } from "./RecipieContext";

function RecipieProvider({children}) {
    const [data, setData] = useState([])

    function LoadRecipieList(category) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/getAll?categoryId=${category}`, {method: "GET"})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }
    
    function LoadRecipie(categoryId, recipieId) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/get?categoryId=${categoryId}&recipieId=${recipieId}`, {method: "GET"})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }

    function LoadRandomRecipie(categoryId) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/getTip?categoryId=${categoryId}`, {method: "GET"})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }

    function SaveNewRecipie(recipie) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/create`, 
            {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(recipie)})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }

    function DeleteRecipie(recipie) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/remove`, 
            {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(recipie)})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }

    const value = {
        outputData: data,
        handlers: {LoadRecipieList, LoadRecipie, LoadRandomRecipie, SaveNewRecipie, DeleteRecipie}

    }

    return (
        <>
        <RecipieContext.Provider value={value}>
            {children}
        </RecipieContext.Provider>
        </>
    )

}

export default RecipieProvider