import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
const App = () => {
  const [number, setNumber] = useState("");
  const [running,setRunning]=useState(false);
  const [game, setGame] = useState(false);
  const [name, setName] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [show, setShow] = useState(false);
  const [submitClick, setSubmitClick] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const [indication,setIndication]=useState("");
  const [showText,setShowText]=useState(false);

  const gameStartHandler = () => {
    const arr = [];
    let count = 0;
    while (arr.length < 4) {
      const randomNum = Math.floor(Math.random() * 9) + 1;
      if (arr.indexOf(randomNum) === -1) {
        arr.push(randomNum);
      }
    }
    setNumber(arr.join(""));
    setGame(true);
    setRunning(true);
    const name = prompt("Enter your name");
    if (name) {
      setName(name);
    }
  };

  useEffect(() => {
    if (running && game) {
      var timer = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }

    return ()=>clearInterval(timer);
  }, [running]);

  const handleInputValidation = (value) => {
    const regex = /^[0-9]{0,4}$/;
    if (regex.test(value)) {
      setInputValue(String(value));
    } else {
      setInputValue("");
    }
  };

  const submitHandler = () => {
    // console.log("Hii");
    if (number == inputValue) {
      console.log("hello");
      setAttempts(attempts + 1);
      setSubmitClick(true);
      // setInputValue("");
      setShow(false);
      setIsDisabled(true);
      const newArr = number.split("");
      const signsArr = newArr.map((num,i)=>num==inputValue[i] ?  "+":"-").join("");
      setShowText(true);
      console.log(signsArr);
      setIndication(signsArr);
      setRunning(false);
      
    } else {
      setAttempts(attempts + 1);
      // setInputValue("");
      const newArr = number.split("");
      const signsArr = newArr.map((num,i)=>num==inputValue[i] ?  "+":"-").join("");
      setShowText(true);
      setIndication(signsArr);
      console.log(signsArr);
    }
  };

  const showAns = () => {
    setShow(true);
    // setInputValue("");
  };

  const playAgainHandler = () => {
    setGame(false);
    setShow(false);
    setInputValue("");
    setSeconds(0);
  };

  return (
    <div className="game-container">
      {game === true ? (
        <div className="game-details">
          {submitClick ? (
            <h1>Game Ended</h1>
          ) : (
            <h1 className="game-started">Game Started</h1>
          )}
          {submitClick && (
            <div>
              <span>Attempts : {attempts}</span> &emsp;
              <span>Score : 2.798657</span>
            </div>
          )}
          {/* {showText && <div>{indication}</div>} */}
          {show && <div>{number}</div>}
          {showText && <div className="indication">{indication}</div>}
          <h3 className="timer">Timer(in seconds) - {seconds}</h3>
          <h3>Guess the Number</h3>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputValidation(e.target.value)}
            className="input-block"
          />
          <button onClick={submitHandler} disabled={isdisabled}>
            Submit
          </button>
          <button onClick={showAns}>Show Ans</button>
          <button onClick={playAgainHandler}>Play Again</button>
          <br />
          {/* 4 digit number is {number}<br/> */}
          {/* our input value is {inputValue}<br/> */}
        </div>
      ) : (
        <button className="start-Game-btn" onClick={gameStartHandler}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default App;
