import configuredAxios from "./common"
import messagePublisher from "messagepublisher"

export const deleteAlbum = async (albumName: string): Promise<boolean | undefined> => {
    try {
        const r = await configuredAxios.delete("/albums", { params: { name: albumName } })
        return r.data.service.ok
    } catch (error) {
        messagePublisher.add(error.message)
    }
}