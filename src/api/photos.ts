import configuredAxios from "./common"
import messagePublusher from "messagepublisher"
import type { SentData } from "./../types/index"

export const getPhotos = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/photos", { params: { page: 1, offset: 10 } })
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublusher.add(error)
    }
}

export const addPhotos = async (d: SentData.LoadedPhotos): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/photos", { data: d })
    } catch (error) {
        messagePublusher.add(error)
    }
}