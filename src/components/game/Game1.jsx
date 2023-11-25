import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MAX_GUESSES = 4;
const MIN_NUMBER = 11;
const MAX_NUMBER = 20;

function Game1() {
  const [isStart, setStart] = useState(false);
  const [value, setValue] = useState(0);
  const [tebakan, setTebakan] = useState(0);
  const [input, setInput] = useState("");
  const [isBtn, setBtn] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleButtonClick = () => {
    if (!isStart) {
      startGame();
    } else {
      makeGuess();
    }
  };

  const startGame = () => {
    setStart(true);
    setValue(generateRandomNumber());
  };

  const makeGuess = () => {
    if (input === "") {
      showToast("Input Tidak Boleh Kosong", "error");
    } else if (value === parseInt(input)) {
      setTebakan(tebakan + 1);
      showToast("Congratulation!! Anda Menang", "success");
      setTebakan(MAX_GUESSES);
    } else if (value > parseInt(input)) {
      setTebakan(tebakan + 1);
      showToast("Nilai Inputan Terlalu Kecil", "error");
    } else if (value < parseInt(input)) {
      setTebakan(tebakan + 1);
      showToast("Nilai Inputan Terlalu Besar", "error");
    }
  };

  const showToast = (message, type) => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };

  const handleReset = () => {
    setValue(generateRandomNumber());
    setTebakan(0);
    const inputElement = document.getElementById("angka");
    inputElement.disabled = false;
    inputElement.value = "";
    setInput("");
    setBtn(!isBtn);
  };

  const generateRandomNumber = () => {
    return (
      Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
    );
  };

  useEffect(() => {
    if (tebakan >= MAX_GUESSES) {
      if (value === parseInt(input)) {
        setBtn(!isBtn);
        const inputElement = document.getElementById("angka");
        inputElement.disabled = true;
      } else {
        setBtn(!isBtn);
        const inputElement = document.getElementById("angka");
        inputElement.disabled = true;
        showToast("Game Over", "error");
      }
    }
  }, [tebakan]);
  return (
    <>
      <h1 className="pt-3 pb-5">Number Guessing Game</h1>
      <div className="px-5 text-start">
        <div className="text-start">
          <p>1. Each Player gets 4 chances to guess</p>
          <p>2. Number range is between 11 - 20</p>
          <p>3. You can reset the number after 4 wrong answers</p>
        </div>
        <div className={isStart ? "py-3 col-md-6" : "visually-hidden"}>
          <div className="text-start">
            <label htmlFor="angka" className="form-label">
              Input Angka
            </label>
            <input
              className="form-control"
              type="number"
              name="angka"
              id="angka"
              placeholder="Input Angka 11 - 20"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <p
          className={isStart ? "text-start pt-2 pb-1" : "text-start pt-3 pb-3"}>
          {isStart ? `Nilai Aslinya adalah ${value}` : "Silahkan Mulai Game"}
        </p>
        <p className={isStart ? "py-2" : "visually-hidden"}>
          Jumlah Tebakan {tebakan}
        </p>
        <div
          className={isBtn ? "visually-hidden" : "d-flex justify-item-start"}>
          <button
            className={isStart ? "btn btn-primary" : "btn btn-success"}
            onClick={handleButtonClick}>
            {isStart ? "Tebak Angka" : "Mulai Permainan"}
          </button>
        </div>
        <div
          className={isBtn ? "d-flex justify-item-start" : "visually-hidden"}>
          <button className="btn btn-danger" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Game1;
