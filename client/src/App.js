import About from "./pages/About";
import MapContainer from "./component/MapContainer";
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Account from "./pages/Account";
import Chat from "./component/Chat";
import { Nav } from "react-bootstrap";
import LandingPage from "./component/LandingPage";


// creates variables that allow chrome speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.start();

function App() {
  let [userPhrase, setPhrase] = useState("");

  const voiceCommands = () => {
    recognition.onstart = () => {
      console.log("Listening");
    };

    recognition.onresult = (e) => {
      // If voice is recognized this function runs.
      let current = e.resultIndex;

      let transcript = e.results[current][0].transcript;
      let mobileRepeatBug =
        current === 1 && transcript === e.results[0][0].transcript;
      console.log(transcript);

      if (!mobileRepeatBug) {
        fetch("/api/v1/users")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const phrase = data[0].phrase.toLowerCase();
            if (transcript === phrase || transcript === ` ${phrase}`) {
              setPhrase((userPhrase = "yes"));
              console.log(userPhrase);
              recognition.start();
            } else {
              recognition.start();
            }
          });
        // checks transcript taken from voice command act performs logic based on that.
      }
    };
  };

  useEffect(() => {
    // This function runs voiceCommands function whenever the page loads.
    voiceCommands();
  });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
        </Switch>

        <div>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/feed" component={Feed} />
          <Route path="/account" component={Account} />
          <Route path="/about" component={About} />
        </div>

        <Route path="/map" component={MapContainer} />
        <Route path="/chat" component={Chat} />
      </div>

    </Router>
  );


  
} 

export default App;
