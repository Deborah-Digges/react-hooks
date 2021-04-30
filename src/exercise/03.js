// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(event) => setName(event.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({name, onChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={name}
        onChange={event => onChange(event.target.value)}
      />
    </div>
  )
}


function Display({animal}) {
  return <div>{`Hey your favorite animal is: ${animal}!`}</div>
}

function App() {
  
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      <Name />
      <FavoriteAnimal name={animal} onChange={setAnimal}/>
      <Display animal={animal} />
    </form>
  )
}

export default App
