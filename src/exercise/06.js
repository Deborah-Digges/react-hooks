// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasError: false
//     };
//   }

//   static getDerivedStateFromError(error) {
//     return {
//       hasError: true
//     };
//   }
  
//   render() {
//     if(this.state.hasError) {
//       return <div>Oops! Something went wrong!</div>
//     }
//     return this.props.children;
//   }
// }
function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  });

  const { pokemon, error, status} = state;
  React.useEffect(() => {
    if(!pokemonName) {
      return () => {};
    }

    setState({
      pokemon: null,
      error: null,
      status: 'pending'
    });

    fetchPokemon(pokemonName).then(
      pokemonData => { 
        setState({
          pokemon: pokemonData,
          status: 'resolved'
        })
      },
      error => {
        setState({
          error: error.message,
          status: 'rejected'
        })
      }
    )
  }, [pokemonName]);
  
  if(status === 'rejected') {
    throw new Error(error);
  } else if(status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if(status === 'idle') {
    return 'Submit a pokemon'
  } else if(status === 'resolved'){
      return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary onReset={() => {setPokemonName('')}} FallbackComponent={ErrorFallback} resetKeys={[pokemonName]}>
        <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
