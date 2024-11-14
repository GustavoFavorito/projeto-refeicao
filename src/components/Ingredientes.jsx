import React, { useState, useEffect } from "react";
import "./Ingredientes.css";

function Ingredientes() {

    const url = "https://apirefeicaonew.netlify.app/receita";
    const [headers, setHeaders] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
  
    const fetchIngredientes = async () => {
        const response = await fetch(url);
        const responseObject = await response.json();
        setIngredientes(responseObject);
        setHeaders(Object.keys(responseObject[0]));
    };
  
    useEffect(() => {
        fetchIngredientes();
    }, []);

    return (
        <>
            <section className="ingredientes" id="ingredientes">
                <div className="row">
                    <table>
                        <tbody>
                            <tr>
                                {headers.map((header, index) => (<th key={index}>{header}</th>))}
                            </tr>
                            {ingredientes.map((ingrediente, index) => (
                                <tr key={index}>
                                    {Object.values(ingrediente).map((elem, index) => (
                                        <td key={index}>{elem}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="cadastrarIngrediente">
                </div>
            </section>
        </>
    );
}

export default Ingredientes;
