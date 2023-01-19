import { SearchForm } from "./SearchForm"
import { useState } from "preact/hooks"
import type { Pokemon } from "../pokemon"



export function PokemonData() {
    
    const [current, setCurrent] = useState<Pokemon>()
    const [history, setHistory] = useState<Pokemon[]>([])

    function changeHistory(data?: Pokemon) {
        if(data) {
            setHistory((prev) => [ data, ...prev ])
        }
    }

    function changeCurrent(data?: Pokemon) {
        if(data) {
            setCurrent(data)
        }
    }

    console.log(history)

    return (
        <>
            <SearchForm changeCurrent={changeCurrent} changeHistory={changeHistory} />
            <div class="flex">
                <div class="flex flex-col">
                    <p class="font-weight">Histórico de pesquisa</p>
                    {
                        history.length ? (
                            <ol class="list-none">
                                {
                                    history.map((data) => (
                                        <li>{data.name}</li>
                                    ))
                                }
                            </ol>
                        ) : (
                            <span>Não há pesquisas feitas</span>
                        )
                    }
                </div>
                {
                    current && (
                        <div class="flex">
                            <img src={current.sprites.front_default} alt={current.name} />
                            <div>
                                <h2 class="capitalize font-bold">{current.name}</h2>
                                <ul>
                                    {
                                        current.abilities.map((skill) => (
                                            <li>{skill.ability.name}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}