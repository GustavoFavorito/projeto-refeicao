import React from "react";
import "./Header.css";

function Header() {
    return (
        <>
            <header>
                <nav>
                    <ul className="main-nav">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#refeicoes">Refeições</a>
                        </li>
                        <li>
                            <a href="#ingredientes">Ingredientes</a>
                        </li>
                        <li>
                            <a href="#home">Salame</a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
