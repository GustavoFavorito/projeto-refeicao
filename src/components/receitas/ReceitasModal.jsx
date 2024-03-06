import React from "react";
import "./ReceitasModal.css";

function ReceitasModal({ isOpen, onClose, item }) {
    if (!isOpen) return null;

    return (
        <>
            <div className="receitas-modal-overlay" onClick={onClose} />
            <div className="receitas-modal">
                <h2>{item[0].titulo}</h2>
                <p>{item[0].descricao}</p>
                <div className="receitas-modal-imagem">
                    <img src={item[0].image_path} alt="imagem modal" />
                </div>
                <div className="receitas-modal-ingredientes">
                    <ul>
                        {item.map((elem) => (
                            <li
                                key={elem.id_ingrediente}
                                className="receitas-ingredientes-item"
                            >
                                <span className="modal-nome">{elem.nome}</span>
                                <span className="modal-unidade">
                                    {elem.quantidade}
                                    {elem.unidade}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ReceitasModal;
