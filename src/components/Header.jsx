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
                            <a href="#cadastro">Cadastro</a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                            >
                                Salame
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
