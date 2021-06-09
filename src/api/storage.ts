export const setTokens = (at: string, lt: string) => {
    localStorage.setItem("X-At", at)
    localStorage.setItem("X-Lt", lt)
}

export const getTokens = (): { at: string, lt: string } => {
    const at = localStorage.getItem("X-At")
    const lt = localStorage.getItem("X-Lt")
    if (at && lt) return { at, lt }
    return { at: "", lt: "" }
}

export const deleteTokens = () => {
    localStorage.removeItem("X-At")
    localStorage.removeItem("X-Lt")
}