import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import StudentForm from './Components/StudentForm';
import TeacherForm from './Components/TeacherForm';
import ParentsForm from './Components/ParentsForm';
import ClassForm from './Components/ClassForm';

function App() {
  return (
    <Router>
      <div className="">

        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/teacher" element={<TeacherForm />} />
          <Route path="/parents" element={<ParentsForm />} />
          <Route path="/class" element={<ClassForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
