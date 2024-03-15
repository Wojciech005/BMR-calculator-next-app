"use client";

import BasicPie from "@/components/results/chart";
import Macroelements from "@/components/results/macroelements";
import { useState } from "react";
import FormPage from "../components/form/form-page";
import ResultPage from "../components/results/result-page";

function resultAligner(result) {
  return Math.floor(result);
}

export default function Home(props) {
  const [basicBmr, setBasicBmr] = useState();
  const [fullBmr, setFullBmr] = useState();
  const [isCalculated, setIsCalulated] = useState(false);
  const [isSexChosen, setIsSexChosen] = useState('');

  const goalStateNumber = 0.15;

  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    age: "",
    activity: "",
    goal: "",
    sex: "",
  });

  const [macroElements, setMacroElements] = useState({
    proteins: {
      kcal: 0,
      grams: 0,
    },
    carbo: {
      kcal: 0,
      grams: 0,
    },
    fat: {
      kcal: 0,
      grams: 0,
    },
  });

  const sexHandler = (isSexChosen) => {
    setIsSexChosen(isSexChosen);
  }

  const calcHandler = (formData) => {
    setFormData(formData);
    let basicBmr;
    let fullBmr;

    const { weight, height, age, goal, activity } = formData;

    if (isSexChosen === "male") {
      setBasicBmr((basicBmr = 66 + 13.7 * weight + 5 * height - 6.8 * age));
    }
    if (isSexChosen === "female") {
      setBasicBmr((basicBmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age));
    }

    const basicBmrResult = resultAligner(basicBmr);
    setBasicBmr(basicBmrResult);

    const basicBmrWithLifestyle = basicBmrResult * activity;
    const basicBmrWithLifestyleResult = basicBmrWithLifestyle;

    if (goal === "up") {
      fullBmr =
        basicBmrWithLifestyleResult +
        goalStateNumber * basicBmrWithLifestyleResult;
    }
    if (goal === "down") {
      fullBmr =
        basicBmrWithLifestyleResult -
        goalStateNumber * basicBmrWithLifestyleResult;
    }
    if (goal === "same") {
      fullBmr = basicBmrWithLifestyleResult;
    }

    const fullBmrResult = resultAligner(fullBmr);
    setFullBmr(fullBmrResult);


  setMacroElements({
      proteins: {
        kcal: resultAligner(fullBmrResult * 0.15),
        grams: resultAligner(resultAligner(fullBmrResult * 0.15) / 4),
      },
      carbo: {
        kcal: resultAligner(fullBmrResult * 0.55),
        grams: resultAligner(resultAligner(fullBmrResult * 0.55) / 4),
      },
      fat: {
        kcal: resultAligner(fullBmrResult * 0.3),
        grams: resultAligner(resultAligner(fullBmrResult * 0.3) / 9),
      },
    });

    if (weight > 0 && height > 0 && age > 0 && isSexChosen !== '') {
      setIsCalulated(true);
    } else {
      setIsCalulated(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 pt-12" >
      <h1 className="text-2xl md:text-4xl text-white mb-10 font-mono">
        BMR kcal calculator
      </h1>
      <section className="w-full md:w-1/3   bg-gray-300/50 p-4 rounded-lg shadow-2xl">
        <FormPage onCalculateResult={calcHandler} sexHandler={sexHandler} sexStatus={isSexChosen}/>
        { isCalculated &&  (
        <div>
        <ResultPage basicBmr={basicBmr} fullBmr={fullBmr} />
        <Macroelements
            proteinKcal={macroElements.proteins.kcal}
            proteinGrams={macroElements.proteins.grams}
            carboKcal={macroElements.carbo.kcal}
            carboGrams={macroElements.carbo.grams}
            fatKcal={macroElements.fat.kcal}
            fatGrams={macroElements.fat.grams}
          />
           <div className="flex justify-start mt-0 md:mt-8">
          <BasicPie
            proteinGrams={macroElements.proteins.grams}
            carboGrams={macroElements.carbo.grams}
            fatGrams={macroElements.fat.grams}
          />
          </div>
           </div>) }
      </section>
    </main>
  );
}
