import configuredAxios from "./common"
import { SentData } from "./../types"

import messagePublusher from "messagepublisher"

export const checkAuth = async (): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.get("/check_auth")
        console.log(r.data)
        return r.data.service.ok
    } catch (error) {
        messagePublusher.add(error.message)
    }
}

export const signIn = async (d: SentData.SignIn): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/sign_in", { data: d })
        return r.data.service.ok
    } catch (error) {
        messagePublusher.add(error.message)
    }
}

export const signUp = async (d: SentData.SignUp): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/sign_up", { data: d })
        return r.data.service.ok
    } catch (error) {
        messagePublusher.add(error.message)
    }
}

export const signOut = async (): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.delete("/sign_out")
        return r.data.service.ok
    } catch (error) {
        messagePublusher.add(error.message)
    }
}



