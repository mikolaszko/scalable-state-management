import { useEffect } from "react"
import { useAppDispatch } from "./store/Hooks/useAppDispatch"
import { useAppSelector } from "./store/Hooks/useAppSelector"
import { getBeerQueryAction } from "./store/Beer/action"
import { beerSelector } from "./store/Beer/beerSlice"
import "./App.css"

const App = () => {
	const dispatch = useAppDispatch()
	const beerData = useAppSelector(beerSelector.selectAll)

	const fetchBeer = () => dispatch(getBeerQueryAction({}))

	const buttonText = beerData.length
		? "Fetch another beer!"
		: "Fetch me a beer!"
	return (
		<div className="hero">
			<h1>Beer data:</h1>
			{JSON.stringify(beerData, null, 4)}
			<button onClick={fetchBeer}>{buttonText}</button>
		</div>
	)
}

export default App
