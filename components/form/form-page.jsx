"use client";
import { Fragment, useRef, useState } from "react";
import ResultPage from "../results/result-page";
import Macroelements from "@/components/results/macroelements";

import React from "react";
import BasicPie from "../results/chart";


function resultAligner(result) {
  return Math.floor(result);
}

export default function FormPage(props) {
  const weight = useRef();
  const height = useRef();
  const age = useRef();
  const lifestyle = useRef();
  const goal = useRef();
  const [selectedOption, setSelectedOption] = useState("Male");

  const [isValidWeight, setIsValidWeight] = useState(true);
  const [isValidHeight, setIsValidHeight] = useState(true);
  const [isValidAge, setIsValidAge] = useState(true);
  const [isValidSex, setIsValidSex] = useState(true);


  const radioHandler = (e) => {
    props.sexHandler(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();

    const userWeight = Number(weight.current.value);
    const userHeight = Number(height.current.value);
    const userAge = Number(age.current.value);
    const userLifestyle = Number(lifestyle.current.value);
    const userGoal = goal.current.value;


    if (userWeight <= 0) {
      setIsValidWeight(false);
    } else {
      setIsValidWeight(true);
    }

    if (userHeight <= 0) {
      setIsValidHeight(false);
    } else {
      setIsValidHeight(true);
    }

    if (userAge <= 0) {
      setIsValidAge(false);
    } else {
      setIsValidAge(true);
    }

    if (props.sexStatus !== '') {
      setIsValidSex(true);
    } else {
      setIsValidSex(false);
    }

    const formData = {
    weight: userWeight,
    height: userHeight,
    age: userAge,
    activity: userLifestyle,
    goal: userGoal
    }

    props.onCalculateResult(formData)
  }

  return (
    <Fragment>
      <form action="" onSubmit={submitHandler}>
        <div className="flex justify-between mt-4">
          <div className="radio-item">
            <input
              type="radio"
              name="sex"
              id="male"
              value="male"
              onChange={radioHandler}
            />
            <label htmlFor="male" className="font-mono">
              Male
            </label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              name="sex"
              id="female"
              value="female"
              onChange={radioHandler}
            />
            <label htmlFor="female" className="font-mono">
              Female
            </label>
          </div>
        </div>
        {!isValidSex && (
            <p className="text-red-700 font-semibold font-mono w-100">Please choose your sex</p>
          )}

        <div className="flex flex-col my-4">
          <label className="font-semibold font-mono">Weight</label>
          <input
            type="number"
            name=""
            id=""
            className="p-3 rounded-lg shadow-lg"
            ref={weight}
            placeholder="kg"
          />
          {!isValidWeight && (
            <p className="text-red-700 font-semibold font-mono">Please add your weigth</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label className="font-semibold font-mono">Height</label>
          <input
            type="number"
            name=""
            id=""
            className="p-3 rounded-lg shadow-lg"
            ref={height}
            placeholder="cm"
          />
          {!isValidHeight && (
            <p className="text-red-700 font-semibold font-mono">Please add your height</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label className="font-semibold font-mono">Age</label>
          <input
            type="number"
            name=""
            id=""
            className="p-3 rounded-lg shadow-lg"
            ref={age}
            placeholder="years"
          />
          {!isValidAge && (
            <p className=" text-red-700 font-semibold font-mono">Please add your age</p>
          )}
        </div>
        <div className="flex flex-col my-4">
          <label className="font-semibold font-mono">Activity</label>
          <select
            name=""
            id=""
            className="p-4 rounded-lg shadow-lg"
            ref={lifestyle}
          >
            <option value="1.2">Sedentary: little or no exercise</option>
            <option value="1.375">Light: exercise 1-3 times/week</option>
            <option value="1.55">
              Active: daily exercise or intense exercise 3-4 times/week
            </option>
            <option value="1.725">
              Very Active: intense exercise 6-7 times/week
            </option>
            <option value="1.9">
              Extra Active:intense exercise daily
            </option>
          </select>
        </div>
        <div className="flex flex-col my-4">
          <label className="font-semibold font-mono">Your goal</label>
          <select name="" id="" className="p-4 rounded-lg shadow-lg" ref={goal}>
            <option value="down">Lose weight</option>
            <option value="same">Keep the same</option>
            <option value="up">Gain weight</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="px-8 py-3 uppercase text-lg text-white shadow-lg shadow-purple-900 bg-purple-800 rounded font-mono w-full"
          >
            Calculate
          </button>
        </div>
      </form>
    </Fragment>
  );
}
