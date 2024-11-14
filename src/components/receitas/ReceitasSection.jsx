import React, { useState, useEffect } from "react";
import "./ReceitasSection.css";
import ReceitasItem from "./ReceitasItem";

function ReceitasSection() {

    const url = "https://apirefeicaonew.netlify.app/receita";
    const [ingredientesObject, setIngredientesObject] = useState([]);
  
    const fetchIngredientesObject = async () => {
        const response = await fetch(url);
        const responseObject = await response.json();
        setIngredientesObject(responseObject);
    };
  
    useEffect(() => {
        fetchIngredientesObject();
    }, []);

    return (
        <>
            <section id="refeicoes">
                <div className="background">
                    <div className="receitas-section">
                        <ReceitasItem ingredientes={ingredientesObject} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default ReceitasSection;
