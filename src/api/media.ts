import configuredAxios from "./common"
import messagePublisher from "messagepublisher"

export const getFullMedia = async (t: "photos" | "videos", thumbnail: string): Promise<{ ok: boolean, media: string } | void> => {
    try {
        const r = await configuredAxios.post(`${t}/detailed`, { data: { thumbnail } })
        return { ok: r.data.service.ok, media: r.data.result.media }
    } catch (error) {
        messagePublisher.add(error)
    }
}