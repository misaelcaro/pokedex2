import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"
import {Link } from "react-router-dom"

const Pokemon = () => {

  const [pokemon, setPokemon] = useState()

  const { id } = useParams()

  const getPercentBar = (stat) => {
    const percent = (stat * 100) / 255
    return `${percent}%`
  }


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then((res) =>
        setPokemon(res.data))

      //console.log(res.data))

      .catch((err) => console.log(err))

  }, [])


  return (
    <main >

      <Link to="/Pokedex"><i className='bx bx-arrow-back' ></i></Link>
      <section className='pokemon'>

        <section className={`pokemon__box bg-lg-${pokemon?.types[0].type.name}`}>
          <section>
            <div className='pokemon__img'>
              <img src={pokemon?.sprites.other.home.front_default} alt="" />
            </div>
          </section>
        </section>

        <section >

          <div className='pokemon__container-id-name'>

            <h2 className='pokemon__id' >#{pokemon?.id}</h2>

            <hr className='pokemon__divder' />
            <h2 className='pokemon__name'>{pokemon?.name}</h2>
          </div>



          <div className='pokemon__container-weight-height'>
            <div>
              <h5 className='pokemon__weight'>weight</h5>
              <h4 className='pokemon__weight-value' >{pokemon?.weight}</h4>
            </div>
            <div>
              <h5 className='pokemon__height'>Height</h5>
              <h4 className='pokemon__height-value'>{pokemon?.height}</h4>
            </div>
          </div>





          <div className='pokemon__container-type-abilities'>
            <div className='pokemon__type'>
              <h3 className='pokemon__type-title'>Type</h3>

              <div className='pokemon__type-list'>
                {
                  pokemon?.types.map(type => <div key={type.type.name}> <span className={`pokemon__type-list-span `}>{type.type.name}</span></div>)
                }
              </div>
            </div>
            <div className='pokemon__abilities'>
              <h3 className='pokemon__abilities-title'>Abilities</h3>
              <div className='pokemon__abilities-list'>
                {
                  pokemon?.abilities.map(ability => <div key={ability.ability.name}><span className='pokemon__hability-list-span'   >{ability.ability.name}</span></div>)
                }

              </div>
            </div>
          </div>



          <section className='pokemon__stats'>
            <h2 className='pokemon__stats-title'>Stats</h2>
            <hr className='divider2' />
            <section className='pokemon__stats-info'>
              {
                pokemon?.stats.map(stat => (
                  <article className='pokemon__stat' key={stat.stat.name}>
                    <div className='pokemon__stat-header'>
                      <h4 className='pokemon__stat-name'>{stat.stat.name}</h4>
                      <h5 className='pokemon__stat-value'>{stat.base_stat}/255</h5>
                    </div>
                    <div className='pokemon__stat-bar'>
                      <div className='pokemon__stat-bargray'>
                        <div className='pokemon__stat-barProgress' style={{ width: getPercentBar(stat.base_stat) }}></div>
                      </div>
                    </div>
                  </article>

                ))
              }

            </section>
          </section>
        </section>
      </section>


      <section className='pokemon__movements'>
        <h3 className='pokemon__movements-title'>Movements</h3>
        <hr className='divider3' />
        <div className='pokemon__movements-list'>{pokemon?.moves.map(move => <div key={move.move.url}><span className='pokemon__movements-list-item'>{move.move.name}</span></div>)}</div>
      </section>
    </main>
  )
}

export default Pokemon