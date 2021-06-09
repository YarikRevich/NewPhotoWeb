import configuredAxios from "./common"
import messagePublusher from "messagepublisher"

export const getAlbums = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/albums")
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublusher.add(error)
    }
}

export const addAlbum = async (albumName: string): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/albums", { data: { name: albumName } })
        return r.data.service.ok
    } catch (error) {
        messagePublusher.add(error)
    }
}