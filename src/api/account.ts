import configuredAxios from "./common"
import messagePublisher from "messagepublisher"
import { IsAuthError } from "../Helpers/utils"


export const getAccountInfo = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/account")
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublisher.add(error.message)
    }
}

export const getAvatar = async (): Promise<{ ok: boolean, avatar: any } | void> => {
    try {
        const r = await configuredAxios.get("/account/avatar")
        if (IsAuthError(r.data.service.error)) {
            return { ok: false, avatar: {} }
        }
        return { ok: r.data.service.ok, avatar: r.data.result.avatar }
    } catch (error) {
        messagePublisher.add(error.message)
    }
}

export const setAvatar = async (a: string): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/account/avatar", { data: { avatar: a } })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error.message)
    }
}
