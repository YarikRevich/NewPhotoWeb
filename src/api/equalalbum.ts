import configuredAxios from "./common"
import messagePublisher from "messagepublisher"
import type { ReceivedData, SentData } from "../types"

export const getEqualAlbum = async (albumName: string, offset: number, page: number): Promise<{ ok: boolean, data: { photos: ReceivedData.ReceivedMedia, videos: ReceivedData.ReceivedMedia } } | undefined | void> => {
    try {
        const r = await configuredAxios.get("/albums/detailed", { params: { "name": albumName, "offset": Math.round(offset), "page": page } })
        return { ok: r.data.service.ok, data: { photos: r.data.result.photos, videos: r.data.result.videos } }
    } catch (error) {
        messagePublisher.add(error.message)
    }
}

export const deleteAlbum = async (albumName: string): Promise<boolean | undefined> => {
    try {
        const r = await configuredAxios.delete("/albums", { params: { name: albumName } })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error.message)
    }
}

export const addMediaToAlbum = async (t: "photos" | "videos", albumName: string, data: SentData.LoadedMedia): Promise<boolean | void> => {
    try {
        const req = (t == "photos" ? { data: { name: albumName, photos: data } } : { data: { name: albumName, videos: data } })
        const r = await configuredAxios.put("/albums/detailed", req)
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error.message)
    }
}