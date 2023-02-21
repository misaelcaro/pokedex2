import React from 'react'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice';
import { useDispatch} from "react-redux"
import "./styles/Home.css"

const Home = () => {

const dispatch=useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
const nameTrainer= e.target.nameTrainer.value
dispatch(setNameTrainerGlobal(nameTrainer));
    };

    return (
        <main className='home'>
            <section className='home__container'>
                <div className='home__img'>
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <h2 className='home__title'>Hello Trainer!</h2>
                <p className='home__paragraph'>Give me your name to start!</p>

                <form className="home__form" onSubmit={handleSubmit}>
                    <input className='home__input' required id="nameTrainer" type="text" placeholder="Your name" />
                    <button className='home__btn' >Start</button>

                </form>
                <div className="home__imgpp">
                    <img src="https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/1/1a/latest/20181107165948/Entrenador_Pok%C3%A9mon_SSBU.png/1200px-Entrenador_Pok%C3%A9mon_SSBU.png" alt="" />
                </div>
            </section>
            <footer>
            <div className='footer__red'>
                
            </div>
            <div className='footer__black'>
                
            </div>
            </footer>
        </main>
    )
}

export default Home