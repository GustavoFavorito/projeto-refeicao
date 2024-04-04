import React from "react";
import "./ReceitasIngredientes.css";

function ReceitasIngredientes({ ingredientes }) {
    return (
        <>
            <ul className="receitas-ingredientes">
                {ingredientes.map((ingrediente, index) => (
                    <li key={index} className="receitas-ingredientes-item">
                        <span className="nome">{ingrediente.nome}</span>
                        <span className="unidade">
                            {ingrediente.quantidade}
                            {ingrediente.unidade}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ReceitasIngredientes;
