import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './view/Login';
import Chat from './view/Chat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
