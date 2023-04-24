import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AddTechnician from './AddTechnician';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="addtechnician/" element={<AddTechnician />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
