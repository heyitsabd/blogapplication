import { Route, Routes  } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBlog from './Pages/AddBlog';
import BlogPage from './Pages/BlogPage';


function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/addBlog' element={<AddBlog/>} />
        <Route path='/posts/:id' element={<BlogPage />} />
      </Routes>
    </div>
  );
}

export default App;
