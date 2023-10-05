import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import MovieList from './components/MovieList/MovieList';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';

function App() {

  
  return (
    <Routes>
        <Route path="/" Component={Home} />
        
        <Route
          path="/movie-list"
          element={<MovieList/>
          }
        />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
        
      </Routes>
  );
}

export default App;
