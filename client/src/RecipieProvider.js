import { useEffect, useState } from "react";
import { RecipieContext } from "./RecipieContext";

function RecipieProvider({children}) {
    const [data, setData] = useState({
        status: null,
        response: null,
    })

    function LoadRecipieList(category) {
        let responseStatus = null;
        useEffect(() => {
            setData({status: "loading", data: null});
            fetch(`http://localhost:3000/recipie/getAll?categoryId=${category}`, {method: "GET"})
            .then(response => {
                responseStatus = response.status;
                return response.json();
            })
            .then(backendData => {
                if (responseStatus >= 400) {
                    setData({status: "error", response: backendData.message});
                } else {
                    setData({status: "ready", response: backendData});
                }
            })
        },[])
    }
    
    function LoadRecipie(categoryId, recipieId) {
        let responseStatus = null;
        useEffect(() => {
            setData({status: "loading", data: null});
            fetch(`http://localhost:3000/recipie/get?categoryId=${categoryId}&recipieId=${recipieId}`, {method: "GET"})
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(backendData => {
                if (responseStatus >= 400) {
                    setData({status: "error", response: backendData.message});
                } else {
                    setData({status: "ready", response: backendData});
                }
            })
        },[])
    }

    function LoadRandomRecipie(categoryId) {
        let responseStatus = null;
        useEffect(() => {
            setData({status: "loading", data: null});
            fetch(`http://localhost:3000/recipie/getTip?categoryId=${categoryId}`, {method: "GET"})
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(backendData => {
                if (responseStatus >= 400) {
                    setData({status: "error", response: backendData.message});
                } else {
                    setData({status: "ready", response: backendData});
                }
            })
        },[])
    }

    function SaveRecipie(update, recipie) {
        useEffect(() => {
            fetch(`http://localhost:3000/recipie/${ update ? "update" : "create"}`, 
            {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(recipie)})
            .then(response => response.json())
            .then(backendData => setData(backendData)
            )
        },[])
    }

    function DeleteRecipie(recipie) {
        let responseStatus = null;
        useEffect(() => {
            setData({status: "loading", data: null});
            fetch(`http://localhost:3000/recipie/remove`, 
            {method: "POST", headers: {"Content-Type": "application/json",}, body: JSON.stringify(recipie)})
            .then(response => {
                responseStatus = response.status;
                return response.json()
            })
            .then(backendData => {
                if (responseStatus >= 400) {
                    setData({status: "error", response: backendData.message});
                } else {
                    setData({status: "ready", response: backendData});
                }
            })
        },[])
    }

    const value = {
        outputData: data,
        handlers: {LoadRecipieList, LoadRecipie, LoadRandomRecipie, SaveRecipie, DeleteRecipie}

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