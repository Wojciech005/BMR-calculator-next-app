import { Fragment } from "react";

export default function ResultPage(props) {

    const {basicBmr, fullBmr} = props


    return(
        <Fragment>
            <div className="my-10">
            <h2 className="text-2xl">Basal metabolic rate: <span className="font-semibold">{basicBmr}kcal</span></h2>
            <h2 className="text-2xl">Your BMR: <span className="font-semibold">{fullBmr}kcal</span> </h2>
            </div>
        </Fragment>
    )
}
