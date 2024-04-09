import React, { useState } from 'react';
import './Cadastro.css';
import CadastroInsere from './CadastroInsere';
import CadastroAtualiza from './CadastroAtualiza';

function Cadastro() {
    const [httpMethod, setHttpMethod] = useState('post');

    const handleMethod = (event) => {
        setHttpMethod(event.target.value);
    }

    return (
        <section className="cadastro" id="cadastro">
            <div className="select-method">
                <select
                    className="select"
                    id="select"
                    name="select"
                    placeholder="Seleciona Metodo"
                    value={httpMethod}
                    onChange={handleMethod}
                >
                    <option value={'post'}>Insere</option>
                    <option value={'put'}>Atualiza</option>
                </select>
            </div>
            <CadastroInsere httpMethod={httpMethod} />
            <CadastroAtualiza httpMethod={httpMethod} />
        </section>
    );
}

export default Cadastro;
