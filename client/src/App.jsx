import { useState, useEffect } from 'react';
import AnimalCard from './components/AnimalCard';
import ButtonGroup from './components/ButtonGroup';
import './App.css';

function App() {
  const [animal, setAnimal] = useState(null);
  const [fact, setFact] = useState('');
  const [catImage, setCatImage] = useState('');
  const [dogImage, setDogImage] = useState('');

  // Fetch initial images for both animals
  useEffect(() => {
    async function fetchInitialImages() {
      const catImg = await fetch('https://api.thecatapi.com/v1/images/search');
      const dogImg = await fetch('https://dog.ceo/api/breeds/image/random');

      const catData = await catImg.json();
      const dogData = await dogImg.json();

      setCatImage(catData[0].url);
      setDogImage(dogData.message);
    }

    fetchInitialImages();
  }, []);

  // Fetch fact and image based on button click
  useEffect(() => {
    if (!animal) return;

    async function fetchAnimalContent() {
      if (animal === 'cat') {
        const factRes = await fetch('https://catfact.ninja/fact');
        const factData = await factRes.json();
        const imgRes = await fetch('https://api.thecatapi.com/v1/images/search');
        const imgData = await imgRes.json();
        setFact(factData.fact);
        setCatImage(imgData[0].url);
      } else {
        const factRes = await fetch('http://localhost:3001/api/dog-fact');
        const factData = await factRes.json();
        setFact(factData.fact);
        const imgRes = await fetch('https://dog.ceo/api/breeds/image/random');
        const imgData = await imgRes.json();
        setDogImage(imgData.message);
      }
    }

    fetchAnimalContent();
  }, [animal]);

  return (
    <div className="app">
      <h1>Cute Animal Facts 🐾</h1>
      <ButtonGroup onAnimalChange={setAnimal} />
      <div className="cards">
        {animal === null && (
          <>
            <AnimalCard image={catImage} fact="" />
            <AnimalCard image={dogImage} fact="" />
          </>
        )}
        {animal === 'cat' && <AnimalCard image={catImage} fact={fact} />}
        {animal === 'dog' && <AnimalCard image={dogImage} fact={fact} />}
      </div>
    </div>
  );

}

export default App;

