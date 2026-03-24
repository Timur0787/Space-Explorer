import type { JSX } from 'react';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
import type { Artist } from '../src/components/schemas/artist.schema';
import { ApiResponceSchema } from '../src/components/schemas/artist.schema';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import './components/card.css';
import './App.css';

function App(): React.JSX.Element {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('/api/planet')
    .then((res) => {
      console.log('API Response:', res.data);
      try {
        const validateResponce = ApiResponceSchema.parse(res.data);
        console.log('Validated data:', validateResponce);
        setArtists(validateResponce);
      } catch (validationError) {
        console.error('Validation error:', validationError);
        setError('Ошибка валидации данных');
      }
    })
   .catch((err) => {
     console.error('API Error:', err);
     setError('Ошибка загрузки данных');
   })
   .finally(() => {
     setLoading(false);
   });
  },[]);

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="main-title">Исследуйте Солнечную Систему</h1>
        <h3 className="subtitle">Откройте для себя удивительный мир планет.</h3>
      </div>
      {loading && <div style={{textAlign: 'center', color: '#e2e8f0', padding: '20px'}}>Загрузка...</div>}
      {error && <div style={{textAlign: 'center', color: '#ef4444', padding: '20px'}}>{error}</div>}
      {!loading && !error && artists.length === 0 && (
        <div style={{textAlign: 'center', color: '#e2e8f0', padding: '20px'}}>Планеты не найдены</div>
      )}
      <div className="cards-container">
        {artists.map((art) => (
          <ArtistCard key={art.id} artist={art}/>
        ))}
      </div>
      <AIChat />
    </div>
  )
}

export default App;
