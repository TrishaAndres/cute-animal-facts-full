export default function ButtonGroup({ onAnimalChange }) {
    return (
      <div className="buttons">
        <button onClick={() => onAnimalChange('cat')}>🐱 Cat Facts</button>
        <button onClick={() => onAnimalChange('dog')}>🐶 Dog Facts</button>
      </div>
    );
  }
  