import React, { useState, useEffect } from 'react';

function CadastroAtualiza({ httpMethod }) {
    if (httpMethod != 'put') return null;

    const [receitasObject, setReceitasObject] = useState([]);
    const [selectedReceita, setSelectedReceita] = useState([]);
    const [selectedReceitaTitulo, setSelectedReceitaTitulo] = useState('');
    const [selectedReceitaImagem, setSelectedReceitaImagem] = useState('');
    const [selectedReceitaDescricao, setSelectedReceitaDescricao] =
        useState('');
    const [selectedReceitaIngredientes, setSelectedReceitaIngredientes] =
        useState([{ nome: '', quantidade: '0', unidade: '' }]);
    const url = 'https://projeto-residencia.rj.r.appspot.com/receita';

    const getReceitasFromApiAsync = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        } catch (err) {
            console.error(err);
        }
    };

    const handleOnChangeReceita = async (event) => {
        try {
            await getReceitasFromApiAsync(url + '/' + event.target.value).then(
                (data) => {
                    setSelectedReceita(data);
                    setSelectedReceitaTitulo(data.titulo);
                    setSelectedReceitaImagem(data.image_path);
                    setSelectedReceitaDescricao(data.descricao);
                    setSelectedReceitaIngredientes(data.ingredientes);
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChangeReceitaTitulo = (event) => {
        setSelectedReceitaTitulo(event.target.value);
    };

    const handleOnChangeReceitaImagem = (event) => {
        setSelectedReceitaImagem(event.target.value);
    };

    const handleOnChangeReceitaDescricao = (event) => {
        setSelectedReceitaDescricao(event.target.value);
    };

    const atualizaReceita = async (event) => {
        event.preventDefault();

        await fetch(url + '/' + selectedReceita._id, {
            method: 'PUT',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                _id: selectedReceita._id,
                titulo: selectedReceitaTitulo,
                image_path: selectedReceitaImagem,
                descricao: selectedReceitaDescricao,
                ingredientes: selectedReceitaIngredientes,
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(
                setReceitasObject([]),
                setSelectedReceita([]),
                setSelectedReceitaTitulo(''),
                setSelectedReceitaImagem(''),
                setSelectedReceitaDescricao(''),
                setSelectedReceitaIngredientes([
                    { nome: '', quantidade: '0', unidade: '' },
                ]),
                getReceitasFromApiAsync(url).then((data) =>
                    setReceitasObject(data)
                )
            )
            .catch((err) => {
                return err;
            });
    };

    const handleIngredienteChange = (event, index) => {
        let ingredientes = [...selectedReceitaIngredientes];
        ingredientes[index][event.target.name] = event.target.value;
        setSelectedReceitaIngredientes(ingredientes);
    };

    const adicionaIngredientesField = () => {
        let ingredientesObject = {
            nome: '',
            quantidade: '0',
            unidade: '',
        };
        setSelectedReceitaIngredientes([
            ...selectedReceitaIngredientes,
            ingredientesObject,
        ]);
    };

    const removeIngredientesField = (index) => {
        let ingredientes = [...selectedReceitaIngredientes];
        ingredientes.splice(index, 1);
        setSelectedReceitaIngredientes(ingredientes);
    };

    useEffect(() => {
        getReceitasFromApiAsync(url).then((data) => setReceitasObject(data));
    }, []);

    return (
        <form
            autoComplete="off"
            className="form-cadastro"
            onSubmit={atualizaReceita}
        >
            <div className="form-group">
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="titulo_select">Nome da Receita</label>
                        <select
                            className="form-control"
                            name="titulo_select"
                            id="titulo_select"
                            onChange={(event) => {
                                handleOnChangeReceita(event);
                            }}
                            required
                        >
                            <option value="">--Selecione uma Receita--</option>
                            {receitasObject.map((item) => {
                                return (
                                    <option value={item._id} key={item._id}>
                                        {item.titulo}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="titulo">Foto da Receita</label>
                        <input
                            type="text"
                            className="form-control"
                            name="titulo"
                            id="titulo"
                            placeholder="Titulo"
                            value={selectedReceitaTitulo}
                            onChange={handleOnChangeReceitaTitulo}
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
                            value={selectedReceitaImagem}
                            onChange={handleOnChangeReceitaImagem}
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
                    value={selectedReceitaDescricao}
                    onChange={handleOnChangeReceitaDescricao}
                    required
                ></textarea>
            </div>
            <div className="form-group">
                {selectedReceitaIngredientes.map((ingrediente, index) => {
                    return (
                        <div
                            key={index}
                            className="form-ingredientes form-row align-items-end"
                        >
                            <div className="form-group col-md-3">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    id="nome"
                                    placeholder="Ingrediente"
                                    onChange={(event) =>
                                        handleIngredienteChange(event, index)
                                    }
                                    value={ingrediente.nome}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="quantidade">Quantidade</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="quantidade"
                                    id="quantidade"
                                    onChange={(event) =>
                                        handleIngredienteChange(event, index)
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
                                        handleIngredienteChange(event, index)
                                    }
                                    value={ingrediente.unidade}
                                    required
                                >
                                    <option value="">
                                        --Selecione uma Unidade--
                                    </option>
                                    <option value="unidade">Unidade</option>
                                    <option value="g">g</option>
                                    <option value="Kg">Kg</option>
                                    <option value="mL">mL</option>
                                    <option value="L">L</option>
                                    <option value="cc">
                                        Colher de Chá (cc)
                                    </option>
                                    <option value="cs">
                                        Colher de Sopa (cs)
                                    </option>
                                    <option value="xíc">Xícara (xíc)</option>
                                    <option value="pitada">Pitada</option>
                                    <option value="a gosto">a gosto</option>
                                </select>
                            </div>
                            <div className="botao-remover form-group col-md-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        removeIngredientesField(index)
                                    }
                                    className="btn btn-outline-danger form-control"
                                >
                                    -
                                </button>
                            </div>
                            <div className="botao-adicionar form-group col-md-1">
                                <button
                                    type="button"
                                    onClick={() =>
                                        adicionaIngredientesField(index)
                                    }
                                    className="btn btn-outline-success form-control"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="d-flex justify-content-start">
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Cadastrar"
                />
            </div>
        </form>
    );
}

export default CadastroAtualiza;
