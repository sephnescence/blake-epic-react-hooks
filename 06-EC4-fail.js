// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
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
    throw pokemonError
    // return (
    //   <div role="alert">
    //     There was an error:{' '}
    //     <pre style={{whiteSpace: 'normal'}}>{pokemonError.message}</pre>
    //   </div>
    // )
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else {
    return <PokemonDataView pokemon={pokemonInfo} />
  }
}

function AppWrappedInErrorBoundary() {
  const [pokemonName, setPokemonName] = React.useState()

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  // Kent put his error boundary around Pokemon Info, not the entire thing
  // I guess that's a difference between Brian and Kent?
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

class App extends React.Component {
  state = {
    error: null,
  }
  static getDerivedStateFromError(error) {
    return {error}
  }
  render() {
    // react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop
    // I'm guessing that the Error Boundary I was using in the frontend masters course wasn't the same
    // https://github.com/sephnescence/react-intro-v7--intermediate-v5/blob/main/typescript/src/ErrorBoundary.tsx
    //    Ah, we made our own Error Boundary. It also had `getDerivedStateFromError` defined, so that must still be required
    // It seems Kent also made his own, but there is an extra credit later that does use react-error-boundary, and
    //    that component requires a fallback as outlined on the first line of these comments, and his solution video
    //    showed him doing his own fallback stuff
    if (this.state.error) {
      return <div>{this.state.error.message}</div>
    }
    return (
      <ErrorBoundary>
        <AppWrappedInErrorBoundary />
      </ErrorBoundary>
    )
  }
}

export default App
