import React from 'react';
import './Card.css';

function Card({tagline, description, title, image}) {
  return (
    <div className = "card">
      <p className = "card__tagline">{tagline}</p>
      <p className = "card__title">{title}</p>
      <img src = {image} alt = "img" />
      <p className = "card__description">{description}</p>
    </div>
  );
}

export default Card;