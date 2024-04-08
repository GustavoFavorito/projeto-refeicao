import React, { useState } from 'react';
import './ReceitasItem.css';
import ReceitasIngredientes from './ReceitasIngredientes';
import ReceitasModal from './ReceitasModal';

function ReceitasItem({ ingredientes }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [search, setSearch] = useState('');

    const handleSelectedItem = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    const handleOnCloseModal = () => {
        setIsOpen(false);
        setSelectedItem(undefined);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <>
            <div className='items'>
                <div className="search-items">
                    <input
                        className="pesquisa"
                        id="pesquisa"
                        type="search"
                        name="pesquisa"
                        placeholder="Pesquisar Receitas"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="receitas-items">
                    <ul>
                        {ingredientes.map((item, index) => {
                            if (search != '') {
                                if (
                                    item.titulo
                                        .toLowerCase()
                                        .includes(search.toLocaleLowerCase())
                                ) {
                                    return (
                                        <div
                                            className="receitas-item"
                                            key={index}
                                            onClick={() =>
                                                handleSelectedItem(item)
                                            }
                                        >
                                            <li>
                                                <div className="receitas-item-imagem">
                                                    <img
                                                        src={item.image_path}
                                                        alt="receitas-imagem"
                                                    />
                                                </div>
                                                <div className="receitas-item-titulo">
                                                    <h3>{item.titulo}</h3>
                                                </div>
                                                <ReceitasIngredientes
                                                    ingredientes={
                                                        item.ingredientes
                                                    }
                                                />
                                            </li>
                                        </div>
                                    );
                                }
                            } else {
                                return (
                                    <div
                                        className="receitas-item"
                                        key={index}
                                        onClick={() => handleSelectedItem(item)}
                                    >
                                        <li>
                                            <div className="receitas-item-imagem">
                                                <img
                                                    src={item.image_path}
                                                    alt="receitas-imagem"
                                                />
                                            </div>
                                            <div className="receitas-item-titulo">
                                                <h3>{item.titulo}</h3>
                                            </div>
                                            <ReceitasIngredientes
                                                ingredientes={item.ingredientes}
                                            />
                                        </li>
                                    </div>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className="receitas-item-modal">
                    <ReceitasModal
                        isOpen={isOpen}
                        onClose={handleOnCloseModal}
                        item={selectedItem}
                    />
                </div>
            </div>
        </>
    );
}

export default ReceitasItem;
