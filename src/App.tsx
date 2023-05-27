import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import Bar from './components/Bar'
import { store } from './reducer/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import 'aos/dist/aos.css';



const App: React.FC = () => {
  

  const [sideBar, setSideBar] = useState(false)

  const controlBar = () => {
    setSideBar(!sideBar);
  }

  const [barHeight, setBarHeight] = useState(0)

  const AOS = require('aos');
  useEffect(() => {
    AOS.init({
      delay:300,
      duration:1000,
      once:true,
    });
    AOS.refresh();
  }, []);


  return (

    <Provider store={store}>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>                
              <NavBar controlBar={controlBar}/>

              <Cart 
              sideBar={sideBar} 
              setSideBar={setSideBar} 
              barHeight={barHeight}/>

              {sideBar ? <Bar
              controlBar={controlBar}
              setSideBar={setSideBar} 
              barHeight={barHeight}
              setBarHeight={setBarHeight}/> 
                  : ''}
            </>
          }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
