import './App.css';
import Body from './components/Body';
import { TodoState } from './Context/TodoContext';
import Signin from './components/Signin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {console.log()}
      <TodoState>
        {/* {context.config == null ? <Signin /> : <Body />} */}
        <Router>
          <Routes>
            <Route index element={<Signin />} />
            <Route exact path="/home" element={<Body />}></Route>
            <Route exact path="/signin" element={<Signin />}></Route>
            <Route
              exact
              path="*"
              element={
                <h1 className="text-2xl md:text-4xl text-red-400 mt-20">
                  Oops!!! Page not found <i class="fa-solid fa-rocket"></i>
                </h1>
              }
            ></Route>
          </Routes>
        </Router>
        {/* <></> */}
      </TodoState>
    </div>
  );
}

export default App;
