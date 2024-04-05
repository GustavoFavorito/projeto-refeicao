import React from 'react';
import './ReceitasIngredientes.css';

function ReceitasIngredientes({ ingredientes }) {
    return (
        <>
            <ul className="receitas-ingredientes">
                {ingredientes.map((ingrediente, index) => {
                    if (ingrediente.quantidade > 0) {
                        return (
                            <li
                                key={index}
                                className="receitas-ingredientes-item"
                            >
                                <span className="nome">{ingrediente.nome}</span>
                                <span className="unidade">
                                    {ingrediente.quantidade}&nbsp;
                                    {ingrediente.unidade}
                                </span>
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={index}
                                className="receitas-ingredientes-item"
                            >
                                <span className="nome">{ingrediente.nome}</span>
                                <span className="unidade">
                                    {ingrediente.unidade}
                                </span>
                            </li>
                        );
                    }
                })}
            </ul>
        </>
    );
}

export default ReceitasIngredientes;
