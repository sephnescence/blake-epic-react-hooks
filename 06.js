// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  console.log('%c POKEMON NAME CHANGED!', 'color: lightGreen')
  const [pokemonInfo, setPokemonInfo] = React.useState()
  const [pokemonError, setPokemonError] = React.useState()
  // eslint? Told me to do async things inside of an effect like this
  // Kent made mention of it too. An effect can only return its cleanup method
  // So you must construct a method an call it in the effect 🤷
  React.useEffect(() => {
    const getPokemon = async () => {
      setPokemonInfo(null)
      setPokemonError(null)

      if (!pokemonName) {
        return <div>Submit a pokemon</div>
      } else {
        await fetchPokemon(pokemonName).then(
          pokemonData => setPokemonInfo(pokemonData),
          error => setPokemonError(error),
        )
        // This will work, but I guess it's interesting to note that if there were a few
        //  .then calls, this catch wouldn't know which encountered a problem, so we can
        //  use the second parameter in the .then so we know which then had the issue
        // .catch()
      }
    }

    getPokemon()
  }, [pokemonName])

  if (pokemonError) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{pokemonError.message}</pre>
      </div>
    )
  } else if (!pokemonName) {
    return <div>Submit a pokemon</div>
  } else if (!pokemonInfo) {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemonInfo} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState()

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
