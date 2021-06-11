import configuredAxios from "./common"
import messagePublisher from "messagepublisher"

export const getAlbums = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/albums")
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublisher.add(error)
    }
}

export const createAlbum = async (albumName: string): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/albums", { data: { name: albumName } })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error)
    }
}