import { SearchForm } from "./SearchForm"
import { useState } from "preact/hooks"
import type { Pokemon } from "../pokemon"



export function PokemonData() {
    
    const [current, setCurrent] = useState<Pokemon>()
    const [history, setHistory] = useState<Pokemon[]>([])

    function changeHistory(data?: Pokemon) {
        if(data) {
            
            setHistory((prev) => {
                if(prev[0]?.name !== data.name) {
                    return [ data, ...prev ]
                }
                return prev
            })
        }
    }

    function changeCurrent(data?: Pokemon) {
        if(data) {
            setCurrent(data)
        }
    }

    return (
        <>
            <SearchForm changeCurrent={changeCurrent} changeHistory={changeHistory} />
            <div class="flex space-x-2 mt-8 capitalize">
                {
                    !!history.length && (
                        <div class="flex flex-col">
                            <p class="font-bold">Histórico de pesquisa</p>
                            {
                                <ol class="list-none">
                                    {
                                        history.map((data) => (
                                            <li>{data.name}</li>
                                        ))
                                    }
                                </ol>
                            }
                        </div>
                    )
                }
                {
                    current && (
                        <div class="flex">
                            <img src={current.sprites.front_default} alt={current.name} class="w-24 h-24 m-auto" />
                            <div>
                                <h2 class="capitalize font-bold text-center">{current.name}</h2>
                                <div class="flex space-x-12 capitalize">
                                    <div class="flex flex-col">
                                        <ul>
                                            {
                                                current.abilities.map((skill) => (
                                                    <li>{skill.ability.name}</li>
                                                ))
                                            }
                                        </ul>
                                        <ul class="mt-auto">
                                            {
                                                current.types.map((type) => (
                                                    <li>{type.type.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <ul>
                                        {
                                            current.stats.map((stat) => (
                                                <li>{stat.stat.name}: {stat.base_stat}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}