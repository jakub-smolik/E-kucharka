import { useEffect, useState } from "react";
import { CategoryContext } from "./CategoryContext";

function CategoryProvider({children}) {
    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch(`http://localhost:3000/category/getAll`, {method: "GET"}).then(
        response => response.json()
        ).then(
            backendData => {
                setData(backendData)
            }
        )
    }, [])

    return (
        <>
            <CategoryContext.Provider value={data}>
                {children}
            </CategoryContext.Provider>
        </>
        // <div>
        //     <MainScreen categories={data}/>
        // </div>
    );
}

export default CategoryProvider;