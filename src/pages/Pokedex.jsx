import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios"
import PokemonCard from '../components/pokedex/PokemonCard'
import "./styles/Pokedex.css"


const Pokedex = () => {
  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [selectType, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const paginationLogic = () => {
    //Cantidad de pokemons por pagina
    const pokemonPerPage =8
    ;

    //pokemons que van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * pokemonPerPage
    const sliceEnd = sliceStart + pokemonPerPage
    const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)

    //ultima pagina
    const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1

    //bloque actual
    const pagesPerBlock = 6
    const actualBlock = Math.ceil(currentPage / pagesPerBlock)

    //paginas que se mostraran en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) + 1
    const maxPage = actualBlock * pagesPerBlock
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i)
      }
    }
    return { pagesInBlock, lastPage, pokemonsInPage }
  }
  const { pagesInBlock, lastPage, pokemonsInPage } = paginationLogic()

  const handleNextPage = () => {
    const newtPage = currentPage + 1 
    if(newtPage > lastPage){
      setCurrentPage(1) 
    }else{
      setCurrentPage(newtPage)
    }
  };

  const handlePreviusPage = () => {
    const newtPage = currentPage-1 || 1
    if(newtPage <1 ){
      setCurrentPage(lastPage) 
    }else{
      setCurrentPage(newtPage)
    }
  }


  


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}/` : "pokemon/?limit=1279"}`
    axios.get(URL)
      .then((res) => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map(pokemon => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            }
          })
          setPokemons(pokemonByType)
        } else {
          setPokemons(res.data.results)
        }
      })
      .catch((err) => console.log(err))
  }, [selectType])



  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
    setPokemonsFilter(pokemonByName)

  }, [pokemonName, pokemons])


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/type/`
    axios.get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err))

  }, [])
  
useEffect(() => {
  setCurrentPage(1)

}, [pokemons])


  return (
    <main className='pokedex__main'>
    <div className='pokedex__search'>

      <p> <span className='pokedex__nameTrainer'>Welcome {nameTrainer}</span>,  Here you can search for your favorite pokemon</p>

      <form className="pokedex__form"onSubmit={handleSubmit}>
      
        <div className='pokedex__input'>
          <input type="text" id="pokemonName" placeholder="search your pokemon" />
          <button className='pokedex__btn'>Search</button>
        </div>
        <select className='pokedex__selector' onChange={handleChangeSelect}>
          <option value="">All</option>
          
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
    </div>

      <section className='pokedex__content'>
        {
          pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonurl={pokemon.url} />)

        }
      </section>
      <section className='pokedex__pagination'>

        <ul>

         
          <li className='pokedex__pagination-li' onClick={() => setCurrentPage(1)}>First</li>
          <li onClick={handlePreviusPage}>Prev</li>
          {
            pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
          }
          <li onClick={handleNextPage}>next</li>
          <li className='pokedex__pagination-li' onClick={() => setCurrentPage(lastPage)}>last</li>

        </ul>

      </section>

    </main>
  )
}

export default Pokedex