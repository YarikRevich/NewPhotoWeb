import axios from "axios"
import { getTokens, setTokens } from "./storage"

const i = axios.create({
	baseURL: "http://localhost:8090",
	headers: { "Fetch": "true", "S-Type": "0" },
})

i.interceptors.request.use((v) => {
	const t = getTokens()
	v.headers["x-at"] = t.at
	v.headers["x-lt"] = t.lt
	return v
})

i.interceptors.response.use((v) => {
	const at = v.headers["x-at"]
	const lt = v.headers["x-lt"]
	if (at && lt) setTokens(at, lt)
	return v
})


export default i
