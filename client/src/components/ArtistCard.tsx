import React, { useState } from 'react';
import type { Artist } from './schemas/artist.schema';


type Props ={
    artist: Artist
    
}

// Функция для получения fallback изображения, если из БД не пришло
function getFallbackImage(planetName: string): string {
  const planetImages: Record<string, string> = {
    'Меркурий': 'https://solarsystem.nasa.gov/system/resources/detail_files/1788_PIA15160_1280.jpg',
    'Венера': 'https://solarsystem.nasa.gov/system/resources/detail_files/1786_PIA00271_1280.jpg',
    'Земля': 'https://solarsystem.nasa.gov/system/resources/detail_files/418_earth_1600x1200.jpg',
    'Марс': 'https://solarsystem.nasa.gov/system/resources/detail_files/1787_PIA00407_1280.jpg',
    'Юпитер': 'https://solarsystem.nasa.gov/system/resources/detail_files/1789_PIA22946_1280.jpg',
    'Сатурн': 'https://solarsystem.nasa.gov/system/resources/detail_files/1790_PIA18172_1280.jpg',
    'Уран': 'https://solarsystem.nasa.gov/system/resources/detail_files/1791_PIA18182_1280.jpg',
    'Нептун': 'https://solarsystem.nasa.gov/system/resources/detail_files/1792_PIA01492_1280.jpg',
    'Плутон': 'https://solarsystem.nasa.gov/system/resources/detail_files/9330_PIA19873_1280.jpg'
  };
  
  return planetImages[planetName] || 'https://via.placeholder.com/300x300?text=Planet';
}

function getPlanetColor(planetName: string): string {
  const planetColors: Record<string, string> = {
    'Меркурий': 'mercury-gradient',
    'Венера': 'venus-gradient',
    'Земля': 'earth-gradient',
    'Марс': 'mars-gradient',
    'Юпитер': 'jupiter-gradient',
    'Сатурн': 'saturn-gradient',
    'Уран': 'uranus-gradient',
    'Нептун': 'neptune-gradient',
    'Плутон': 'pluto-gradient'
  };
  
  return planetColors[planetName] || 'default-gradient';
}

export default function ArtistCard({artist}: Props):React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="artist-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="planet-image-container">
        <img 
          src={(artist as { img?: string | null }).img || getFallbackImage(artist.name)} 
          alt={artist.name}
          className={`planet-image ${isHovered ? 'planet-image-hovered' : ''}`}
          onError={(e) => {
            // Если изображение из БД не загрузилось, используем fallback
            const target = e.target as HTMLImageElement;
            const fallbackSrc = getFallbackImage(artist.name);
            if (target.src !== fallbackSrc) {
              target.src = fallbackSrc;
            }
          }}
        />
      </div>

      <div 
        className={`planet-gradient-overlay ${getPlanetColor(artist.name)} ${isHovered ? 'gradient-hovered' : ''}`}
      />

      <div className="planet-info">
        <div className="planet-header">
          <h3 className="planet-name">{artist.name}</h3>
        </div>

        <p className="planet-description">{artist.description}</p>

        <div className="planet-details">
          <div className="planet-detail-row">
            <span className="detail-label">Диаметр:</span>
            <span className="detail-value">{artist.diam}</span>
          </div>
          <div className="planet-detail-row">
            <span className="detail-label">Расстояние:</span>
            <span className="detail-value">{artist.distantion}</span>
          </div>
          <div className="planet-detail-row">
            <span className="detail-label">Спутники:</span>
            <span className="detail-value">{artist.saliter}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

