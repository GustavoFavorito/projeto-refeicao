import React from 'react';
import Fraction from 'fraction.js';
import './ReceitasIngredientes.css';

function ReceitasIngredientes({ ingredientes }) {
    const formataQuantidade = (quantidade) => {
        return new Fraction(quantidade).toFraction(true);
    };

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
                                    {formataQuantidade(ingrediente.quantidade)}
                                    &nbsp;
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
