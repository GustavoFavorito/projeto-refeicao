import React, { useState, useEffect } from 'react';
import './Cadastro.css';

function Cadastro() {
    const url = 'https://projeto-residencia.rj.r.appspot.com/receita';
    const [newTitulo, setNewTitulo] = useState('');
    const [newImagem, setNewImagem] = useState('');
    const [newDescricao, setNewDescricao] = useState('');
    const [ingredientesList, setIngredientesList] = useState([
        { nome: '', quantidade: '', unidade: '' },
    ]);

    const handleTituloChange = (event) => {
        setNewTitulo(event.target.value);
    };

    const handleImagemChange = (event) => {
        setNewImagem(event.target.value);
    };

    const handleDescricaoChange = (event) => {
        setNewDescricao(event.target.value);
    };

    const handleIngredienteChange = (event, index) => {
        let ingredientes = [...ingredientesList];
        ingredientes[index][event.target.name] = event.target.value;
        setIngredientesList(ingredientes);
    };

    // adiciona o novo bloco de elementos de Ingrediente ao useState
    const addIngredientesField = () => {
        let ingredientesObject = {
            nome: '',
            quantidade: '',
            unidade: '',
        };
        setIngredientesList([...ingredientesList, ingredientesObject]);
    };

    const addReceita = async (event) => {
        event.preventDefault();

        const receita = {
            titulo: newTitulo,
            image_path: newImagem,
            descricao: newDescricao,
        };

        receita.ingredientes = ingredientesList;

        await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(receita),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(() => {
                setNewTitulo('');
                setNewImagem('');
                setNewDescricao('');
                setIngredientesList([
                    { nome: '', quantidade: '', unidade: '' },
                ]);
            })
            .catch((err) => {
                return err;
            });
    };

    return (
        <section className="cadastro" id="cadastro">
            <form
                onSubmit={addReceita}
                autoComplete="off"
                className="form-cadastro"
            >
                <div>
                    <label htmlFor="titulo">Nome da Receita</label>
                    <input
                        type="text"
                        name="titulo"
                        id="titulo"
                        placeholder="Receita"
                        value={newTitulo}
                        onChange={handleTituloChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image_path">Foto da Receita</label>
                    <input
                        type="text"
                        name="image_path"
                        id="image_path"
                        placeholder="Foto"
                        value={newImagem}
                        onChange={handleImagemChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Passo a Passo</label>
                    <textarea
                        name="descricao"
                        id="descricao"
                        cols="20"
                        rows="4"
                        placeholder="Passo-a-Passo"
                        value={newDescricao}
                        onChange={handleDescricaoChange}
                        required
                    ></textarea>
                </div>
                <div>
                    {ingredientesList.map((ingrediente, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <label htmlFor="nome">
                                        Nome do Ingrediente
                                    </label>
                                    <input
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        placeholder="Ingrediente"
                                        onChange={(event) =>
                                            handleIngredienteChange(
                                                event,
                                                index
                                            )
                                        }
                                        value={ingrediente.nome}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="quantidade">
                                        Quantidade do Ingrediente
                                    </label>
                                    <input
                                        type="number"
                                        name="quantidade"
                                        id="quantidade"
                                        placeholder="Quantidade"
                                        onChange={(event) =>
                                            handleIngredienteChange(
                                                event,
                                                index
                                            )
                                        }
                                        value={ingrediente.quantidade}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="unidade">
                                        Unidade do Ingrediente
                                    </label>
                                    <input
                                        type="text"
                                        name="unidade"
                                        id="unidade"
                                        placeholder="Unidade"
                                        onChange={(event) =>
                                            handleIngredienteChange(
                                                event,
                                                index
                                            )
                                        }
                                        value={ingrediente.unidade}
                                        required
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <button onClick={addIngredientesField}>
                        Novo Ingrediente
                    </button>
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </section>
    );
}

export default Cadastro;
