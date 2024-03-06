import React from 'react'
import './App.css'
import Header from './components/Header'
import ReceitasSection from './components/receitas/ReceitasSection'
import Ingredientes from './components/Ingredientes'

function App() {
  return (
    <>
      <Header />
      <ReceitasSection />
      <Ingredientes />
    </>
  )
}

export default App
