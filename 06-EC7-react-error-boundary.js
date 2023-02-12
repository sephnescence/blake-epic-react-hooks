// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {PokemonForm} from '../pokemon'

const PokemonInfoErrorBoundary = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState(() => {
    console.log('%c REMOUNTING POKEMON INFO', 'color: lightGreen')
    return {
      status: pokemonName ? 'pending' : 'idle', // Only show the idle state if pokemonName is empty
      pokemonInfo: null,
      pokemonError: null,
    }
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
    throw pokemonError.message
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

  function resetErrorBoundary() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          // key={pokemonName} // Kent mentioned that using a key like this actually forces the component to unmount and remount, which isn't necessarily best practice, but even without the key, it appears that it is remounting when an error boundary is hit, but there's definitely less "remounting pokemon info" logs
          FallbackComponent={PokemonInfoErrorBoundary}
          onReset={resetErrorBoundary}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
