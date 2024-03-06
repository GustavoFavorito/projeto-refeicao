import React from "react";
import "./ReceitasIngredientes.css";

function ReceitasIngredientes({ ingredientes }) {
    return (
        <>
            <ul className="receitas-ingredientes">
                {ingredientes.map(ingrediente => (
                    <li key={ingrediente.id_ingrediente} className="receitas-ingredientes-item">
                        <span className="nome">{ingrediente.nome}</span>
                        <span className="unidade">{ingrediente.quantidade}{ingrediente.unidade}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ReceitasIngredientes;
