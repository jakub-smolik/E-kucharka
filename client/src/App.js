import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapNavbar from './BoostrapNavbar';
import RecipieProvider from './RecipieProvider';
import CategoryProvider from './CategoryProvider';
import MainScreen from './MainScreen';
import RecipieListScreen from './RecipieListScreen';
import RecipieScreen from './RecipieScreen';
import RandomSelectScreen from './RandomSelectScreen';
import RandomRecipieScreen from './RandomRecipieScreen';
import AddRecipieScreen from "./AddRecipieScreen";
import RemoveRecipie from './RemoveRecipie';

function App() {
  
  return (
    <div style={bodyStyle()}>
    <CategoryProvider>
      <RecipieProvider>
        <BrowserRouter>        
          <BootstrapNavbar />
          <div style={componentStyle()}>
          <Routes>
            <Route exact path="/" element={<MainScreen />}></Route>
            <Route path="/recipieList/:category" element = {<RecipieListScreen />}></Route>
            <Route path="/recipie/:categoryId/:recipieId" element = {<RecipieScreen />}></Route>
            <Route path="/randomSelect" element = {<RandomSelectScreen />}></Route>
            <Route path="/randomRecipie/:categoryId" element = {<RandomRecipieScreen />}></Route>
            <Route path="/addRecipieScreen/:categoryId?/:recipieId?" element = {<AddRecipieScreen />}></Route>
            <Route path="/deleteRecipie/:categoryId/:recipieId" element = {<RemoveRecipie />}></Route>
            <Route path="*" element={"404 Not found"}></Route>
          </Routes>
          </div>        
        </BrowserRouter>
      </RecipieProvider>
    </CategoryProvider>
    </div>
  );
}

function componentStyle(){
  return {
    height: "100vh",
    overflow: "hidden",
    margin: "0% 5%",
    padding: "10px 0px",
  }
}

function bodyStyle() {
  return {
    backgroundColor: "#d5e1f5",
  }
}

export default App;  