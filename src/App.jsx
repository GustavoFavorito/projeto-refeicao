import React from 'react'
import './App.css'
import Header from './components/Header'
import ReceitasSection from './components/receitas/ReceitasSection'
import Cadastro from './components/cadastro/Cadastro'

function App() {
  return (
    <>
      <Header />
      <ReceitasSection />
      <Cadastro />
    </>
  )
}

export default App
