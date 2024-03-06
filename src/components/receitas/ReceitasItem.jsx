import React, { useState } from "react";
import "./ReceitasItem.css";
import ReceitasIngredientes from "./ReceitasIngredientes";
import ReceitasModal from "./ReceitasModal";

function ReceitasItem({ ingredientes }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(undefined);

    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const handleOnCloseModal = () => {
        setIsOpen(false);
        setSelectedItem(undefined);
    };

    return (
        <>
            <div className="receitas-items">
                <ul>
                    {ingredientes.map((item, index) => (
                        <div
                            className="receitas-item"
                            key={index}
                            onClick={() => handleSelectedItem(item)}
                        >
                            <li>
                                <div className="receitas-item-imagem">
                                    <img
                                        src={item[index].image_path}
                                        alt="receitas-imagem"
                                    />
                                </div>
                                <div className="receitas-item-titulo">
                                    <h3>{item[index].titulo}</h3>
                                </div>
                                <ReceitasIngredientes ingredientes={item} />
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            <div className="receitas-item-modal">
                <ReceitasModal
                    isOpen={isOpen}
                    onClose={handleOnCloseModal}
                    item={selectedItem}
                />
            </div>
        </>
    );
}

export default ReceitasItem;
