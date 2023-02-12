// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({
  pokemonName,
  pokemonInfo,
  pokemonError,
  setPokemonInfo,
  setPokemonError,
}) {
  const getPokemon = React.useCallback(
    async pokemonName => {
      setPokemonInfo(null)
      setPokemonError(null)

      if (!pokemonName) {
        return <div>Submit a pokemon</div>
      } else {
        await fetchPokemon(pokemonName).then(
          pokemonData => setPokemonInfo(pokemonData),
          error => setPokemonError(error),
        )
      }
    },
    [setPokemonError, setPokemonInfo],
  )

  React.useEffect(() => {
    getPokemon(pokemonName)
  }, [getPokemon, pokemonName])

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
  const [pokemonInfo, setPokemonInfo] = React.useState()
  const [pokemonError, setPokemonError] = React.useState()

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo
          pokemonName={pokemonName}
          pokemonInfo={pokemonInfo}
          pokemonError={pokemonError}
          setPokemonInfo={setPokemonInfo}
          setPokemonError={setPokemonError}
        />
      </div>
    </div>
  )
}

export default App
