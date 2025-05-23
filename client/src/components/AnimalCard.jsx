export default function AnimalCard({ image, fact }) {
    return (
      <div className="card">
        <img src={image} alt="Cute Animal" />
        <p>{fact}</p>
      </div>
    );
  }
  