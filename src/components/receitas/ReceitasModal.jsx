import React from "react";
import "./ReceitasModal.css";

function ReceitasModal({ isOpen, onClose, item }) {
    if (!isOpen) return null;

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
                        {item.ingredientes.map((elem, index) => (
                            <li
                                key={index}
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
