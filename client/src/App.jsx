import './App.css';
import InputTodo from './components/InputTodo.jsx';
import DisplayTodo from './components/DisplayTodo.jsx';

const App = () => {
  return (
    <div className="App">
      <InputTodo/>
      <DisplayTodo />
    </div>
  );
}

export default App;
