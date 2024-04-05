import React from 'react';
import Fraction from 'fraction.js';
import './ReceitasModal.css';

function ReceitasModal({ isOpen, onClose, item }) {
    if (!isOpen) return null;
    const formataQuantidade = (quantidade) => {
        return new Fraction(quantidade).toFraction(true);
    };

    return (
        <>
            <div className="receitas-modal-overlay" onClick={onClose} />
            <div className="receitas-modal">
                <h2>{item.titulo}</h2>
                <p>{item.descricao}</p>
                <div className="receitas-modal-imagem">
                    <img src={item.image_path} alt="imagem modal" />
                </div>
                <div className="receitas-modal-ingredientes">
                    <ul>
                        {item.ingredientes.map((elem, index) => {
                            if (elem.quantidade > 0) {
                                return (
                                    <li
                                        key={index}
                                        className="receitas-ingredientes-item"
                                    >
                                        <span className="modal-nome">
                                            {elem.nome}
                                        </span>
                                        <span className="modal-unidade">
                                            {formataQuantidade(elem.quantidade)}&nbsp;
                                            {elem.unidade}
                                        </span>
                                    </li>
                                );
                            } else {
                                return (
                                    <li
                                        key={index}
                                        className="receitas-ingredientes-item"
                                    >
                                        <span className="modal-nome">
                                            {elem.nome}
                                        </span>
                                        <span className="modal-unidade">
                                            {elem.unidade}
                                        </span>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ReceitasModal;
