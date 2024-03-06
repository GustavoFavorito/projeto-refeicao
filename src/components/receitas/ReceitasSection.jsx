import React, { useState, useEffect } from "react";
import "./ReceitasSection.css";
import ReceitasItem from "./ReceitasItem";

function ReceitasSection() {

    const url = "https://api-receitas-7jslu65vla-rj.a.run.app/fetch-receita";
    const [ingredientesObject, setIngredientesObject] = useState([]);
  
    const fetchIngredientesObject = async () => {
        const response = await fetch(url);
        const responseObject = await response.json();
        setIngredientesObject(
            Object.values(
                Object.groupBy(responseObject, ({ id_receita }) => id_receita)
            )
        );
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
