import logo from './logo.svg';
import './App.css';
// import Root from './Theme1.js';
import default_image from './Clonet_logo.jpeg';
import {useEffect, useState} from 'react';
import Root from './about_customer.js';
import Contact_cst from './contact_customer.js';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

// function App() {
//
//   const [message, setMessage] = useState("1")
//   const [message2, setMessage2] = useState("2")
//
//   useEffect(()=>{
//     fetch("/about_customer1")
//         .then(res => res.text())
//         .then(m=>setMessage(m))
//   }, [])
//
//   useEffect(()=>{
//     fetch("/about_customer2")
//         .then(res => res.text())
//         .then(m=>setMessage2(m))
//   }, [])
//
//   return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             {message}
//           </p>
//           <p>
//             {message2}
//           </p>
//           <a
//               className="App-link"
//               href="https://reactjs.org"
//               target="_blank"
//               rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//   );
// }

function App() {
    const [text, setText] = useState("");
    const onChange = (e) => {
        setText(e.target.value);
    };

    const onReset = () => {
        setText("");
    };
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Root />
                    </Route>
                    <Route exact path="/about_customer">
                        <Root />
                    </Route>
                    <Route path="/contct_customer" component={Contact_cst}>
                        <Contact_cst/>
                    </Route>
                </Switch>

            </div>

        </BrowserRouter>

    );
}

export default App;