import configuredAxios from "./common"
import type { SentData } from "./../types/index"
import messagePublisher from "messagepublisher"

export const getVideos = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/videos", { params: { page: 1, offset: 10 } })
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublisher.add(error)
    }
}

export const addVideos = async (d: SentData.LoadedMedia): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/videos", { data: d })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error)
    }
}

export const getPhotos = async (): Promise<{ ok: boolean, data: any } | void> => {
    try {
        const r = await configuredAxios.get("/photos", { params: { page: 1, offset: 10 } })
        return { ok: r.data.service.ok, data: r.data.result }
    } catch (error) {
        messagePublisher.add(error)
    }
}

export const addPhotos = async (d: SentData.LoadedMedia): Promise<boolean | void> => {
    try {
        const r = await configuredAxios.post("/photos", { data: d })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error)
    }
}

export const getFullMedia = async (t: "photos" | "videos", thumbnail: string): Promise<{ ok: boolean, media: string } | void> => {
    try {
        const r = await configuredAxios.post(`${t}/detailed`, { data: { thumbnail } })
        return { ok: r.data.service.ok, media: r.data.result.media }
    } catch (error) {
        messagePublisher.add(error)
    }
}

