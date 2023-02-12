// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemonInfo: null,
    pokemonError: null,
  })
  const {status, pokemonInfo, pokemonError} = state

  React.useEffect(() => {
    const getPokemon = async () => {
      setState({
        status: 'pending',
        pokemonInfo: null, // Kent doesn't do this, but I think it should be here to avoid keys not existing, right?
        pokemonError: null, // Kent doesn't do this, but I think it should be here to avoid keys not existing, right?
      })

      if (!pokemonName) {
        setState({
          status: 'idle',
          pokemonInfo: null,
          pokemonError: null,
        })
      } else {
        await fetchPokemon(pokemonName).then(
          pokemonData =>
            setState({
              status: 'resolved',
              pokemonInfo: pokemonData,
              pokemonError: null,
            }),
          error =>
            setState({
              status: 'rejected',
              pokemonInfo: null,
              pokemonError: error,
            }),
        )
      }
    }

    getPokemon()
  }, [pokemonName])

  if (status === 'idle') {
    return <div>Submit a pokemon</div>
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{pokemonError.message}</pre>
      </div>
    )
  } else if (status === 'pending') {
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
