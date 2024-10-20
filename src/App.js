import { Route, Routes, useParams  } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBlog from './AddBlog';
import BlogPage from './BlogPage';


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
