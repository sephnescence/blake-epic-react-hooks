// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

function PokemonInfo({appState, setAppState}) {
  React.useEffect(() => {
    const getPokemon = async pokemonName => {
      setAppState({
        ...appState,
        pokemonInfo: null,
        pokemonError: null,
      })

      if (!pokemonName) {
        return <div>Submit a pokemon</div>
      } else {
        await fetchPokemon(pokemonName).then(
          pokemonData =>
            setAppState({
              ...appState,
              pokemonInfo: pokemonData,
            }),
          error =>
            setAppState({
              ...appState,
              pokemonError: error,
            }),
        )
      }
    }

    getPokemon(appState.pokemonName)
  }, [appState, setAppState])

  if (appState.pokemonError) {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>
          {appState.pokemonError.message}
        </pre>
      </div>
    )
  } else if (!appState.pokemonName) {
    return <div>Submit a pokemon</div>
  } else if (!appState.pokemonInfo) {
    return <PokemonInfoFallback name={appState.pokemonName} />
  } else {
    return <PokemonDataView pokemon={appState.pokemonInfo} />
  }
}

function App() {
  const [appState, setAppState] = React.useState({
    pokemonName: null,
    pokemonInfo: null,
    pokemonError: null,
  })
  // const [pokemonName, setPokemonName] = React.useState()
  // const [pokemonInfo, setPokemonInfo] = React.useState()
  // const [pokemonError, setPokemonError] = React.useState()

  function handleSubmit(newPokemonName) {
    setAppState({
      ...appState,
      pokemonName: newPokemonName,
    })
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={appState.pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo appState={appState} setAppState={setAppState} />
      </div>
    </div>
  )
}

export default App
