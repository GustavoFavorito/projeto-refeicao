import React, { useState, useEffect } from 'react';
import './Cadastro.css';

function Cadastro() {
    const url = 'https://projeto-residencia.rj.r.appspot.com/receita';
    const [newTitulo, setNewTitulo] = useState('');
    const [newImagem, setNewImagem] = useState('');
    const [newDescricao, setNewDescricao] = useState('');
    const [ingredientesList, setIngredientesList] = useState([
        { nome: '', quantidade: '0', unidade: '' },
        { nome: '', quantidade: '0', unidade: '' },
        { nome: '', quantidade: '0', unidade: '' },
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
            quantidade: '0',
            unidade: '',
        };
        setIngredientesList([...ingredientesList, ingredientesObject]);
    };

    const removeIngredientesField = (index) => {
        let ingredientes = [...ingredientesList];
        ingredientes.splice(index, 1);
        setIngredientesList(ingredientes);
    };

    const addReceita = async (event) => {
        event.preventDefault();

        const receita = {
            titulo: newTitulo,
            image_path: newImagem,
            descricao: newDescricao,
        };

        if (ingredientesList.length > 2) {
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
        } else {
            alert(
                'Necessário ao menos 3 (três) ingredientes para cadastro de Receita!'
            );
        }
    };

    return (
        <section className="cadastro" id="cadastro">
            <form
                onSubmit={addReceita}
                autoComplete="off"
                className="form-cadastro"
            >
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="titulo">Nome da Receita</label>
                            <input
                                type="text"
                                className="form-control"
                                name="titulo"
                                id="titulo"
                                placeholder="Receita"
                                value={newTitulo}
                                onChange={handleTituloChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="image_path">Foto da Receita</label>
                            <input
                                type="text"
                                className="form-control"
                                name="image_path"
                                id="image_path"
                                placeholder="Foto"
                                value={newImagem}
                                onChange={handleImagemChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="descricao">Passo a Passo</label>
                    <textarea
                        name="descricao"
                        className="form-control"
                        rows="3"
                        id="descricao"
                        placeholder="Passo-a-Passo"
                        value={newDescricao}
                        onChange={handleDescricaoChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    {ingredientesList.map((ingrediente, index) => {
                        return (
                            <div
                                key={index}
                                className="form-ingredientes form-row align-items-end"
                            >
                                <div className="form-group col-md-4">
                                    <label htmlFor="nome">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
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
                                <div className="form-group col-md-2">
                                    <label htmlFor="quantidade">
                                        Quantidade
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="quantidade"
                                        id="quantidade"
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
                                <div className="form-group col-md-5">
                                    <label htmlFor="unidade">Unidade</label>
                                    <select
                                        className="form-control"
                                        name="unidade"
                                        id="unidade"
                                        onChange={(event) =>
                                            handleIngredienteChange(
                                                event,
                                                index
                                            )
                                        }
                                        value={ingrediente.unidade}
                                        required
                                    >
                                        <option value="">--Selecione uma Unidade--</option>
                                        <option value="g">g</option>
                                        <option value="mL">mL</option>
                                        <option value="cc">Colher de Chá (cc)</option>
                                        <option value="cs">Colher de Sopa (cs)</option>
                                        <option value="xíc">Xícara (cs)</option>
                                    </select>
                                </div>
                                <div className="botao-remover form-group col-md-1">
                                    <button
                                        onClick={() =>
                                            removeIngredientesField(index)
                                        }
                                        className="btn btn-outline-danger form-control"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    <div className="botao-adicionar form-group d-flex flex-row-reverse">
                        <button
                            className="btn btn-outline-success"
                            onClick={addIngredientesField}
                        >
                            Novo Ingrediente
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-start">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value="Cadastrar"
                    />
                </div>
            </form>
        </section>
    );
}

export default Cadastro;
