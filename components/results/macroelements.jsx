export default function Macroelements(props) {

   const  {proteinKcal, proteinGrams, carboKcal, carboGrams, fatKcal, fatGrams} = props

    return(
        <>
        <div>
            <h2 className="text-2xl">Proteins: <span className="font-semibold">{proteinKcal} kcal = {proteinGrams}g </span> </h2>
            <h2 className="text-2xl">Carbo: <span className="font-semibold">{carboKcal} kcal = {carboGrams}g</span> </h2>
            <h2 className="text-2xl">Fat: <span className="font-semibold">{fatKcal} kcal =  {fatGrams}g </span> </h2>
        </div>
        </>
    )
}
