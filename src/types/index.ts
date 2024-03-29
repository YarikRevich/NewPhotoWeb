export namespace SentData {
    export type SignUp = {
        login: string
        firstname: string;
        secondname: string;
        password1: string;
        password2: string;
    }
    export type SignIn = {
        login: string;
        password: string;
    }
    export type LoadedMedia = {
        file: string
        name: string
        size: number
        extension: string
    }[]
    export type Photos = {
        tags: string[]
    }[]
}

export namespace ReceivedData {
    export type ReceivedMedia = {
        thumbnail: string
        tags: string[]
    }[]
}

export namespace Util {
    export interface Tagged {
        tags?: string[]
    }
}

export namespace StateComponenents {
    export interface Service {
        message: string;
        ok: boolean;
        requested: boolean;
        cleanMessage: Function;
    }

    export interface MediaPage {
        result: {
            photos: {
                thumbnail: string
                tags: string[]
            }[],
            videos: {
                thumbnail: string
                tags: string[]
            }[]

        }
        isUpdate: boolean
        fullMedia: {
            isShown: boolean,
            src: string,
        },
        chosenTags: string[],
    }

    export interface AlbumsPage {
        result: {
            name: string,
            latestphotothumbnail: string
        }[];
        isUpdate: boolean
        redirect: {
            isRedirect: boolean
            to: string
        }
    }

    export interface AccountPage {
        result: {
            firstname: string;
            secondname: string;
            storage: string;
        };
        login: {
            ok: boolean;
        };
        registration: {
            service: Service;
        },
        service: Service;
        redirects: {
            loginRedirect: boolean;
        }
    }

    export interface LoginModel {
        login: string
        password: string
    }

    export interface LoadPhotoModel {
        result: {
            file: string
            extension: string
            name: string
            size: number
        }[]
    }

    export interface EqualAlbumPage {
        result: {
            photos: ReceivedData.ReceivedMedia,
            videos: ReceivedData.ReceivedMedia,
        },
        isUpdate: boolean,
        fullMedia: {
            isShown: boolean,
            src: string,
        },
        goBack: boolean
    }

    export interface Authentication {
        isAuthed: boolean,
        isChecking: boolean,
        isSignedUp: boolean,
    }

    export interface App {
        initialized: boolean
    }
}

export interface State {
    mediaPage: StateComponenents.MediaPage;

    albumsPage: StateComponenents.AlbumsPage;

    accountPage: StateComponenents.AccountPage;

    equalAlbumPage: StateComponenents.EqualAlbumPage;

    authentication: StateComponenents.Authentication;

    app: StateComponenents.App
}

export namespace Components {
    export namespace DetailedView {
        export interface DetailedViewType {
            readonly anchorEl: HTMLImageElement | null
            readonly type: "photo" | "video"
            readonly media: string
            readonly mediaSize: {
                height: number
                width: number
            }
            readonly visible: boolean
            onClose: () => void
        }
    }

    export namespace MediaOrderer {
        export interface MediaOrdererType<T> {
            data: Array<T> | null
            readonly tags?: string[]
            readonly mediaSize: {
                width: number;
                height: number;
            };
            render(
                value: T,
                index: number,
                size: {
                    width: number;
                    height: number;
                }): JSX.Element


            // readonly type: "photo" | "video" | "albums" | "equalalbum"

            // readonly photoPage: StateComponenents.PhotoPage;
            // readonly videoPage: StateComponenents.VideoPage
            // readonly albumsPage: StateComponenents.AlbumsPage
            // readonly equalAlbumPage: StateComponenents.EqualAlbumPage
            // getFullPhoto(thumbnail: string): void;
        }
    }
    export namespace Auth {
        export namespace SignUp {
            export interface SignUpType {
                readonly isSignedUp: boolean
                handleSubmit(d: SentData.SignUp): void
            }
        }
        export namespace SignIn {
            export interface SignInType {
                readonly isAuthed: boolean
                readonly isSignedUp: boolean
                handleSubmit(d: SentData.SignIn): void
                turnOffSignedUp(): void
            }
        }
    }

    export namespace App {
        export interface AppType {
            initialized: boolean
            initialize: () => void
        }
    }
    export namespace Account {
        export interface AccountType {
            accountPage: StateComponenents.AccountPage
            handleLogout(): void
            getAccountInfo(): void
            handleSubmit(ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>): void
            handleForm(ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLInputElement>, ref4: React.RefObject<HTMLInputElement>, ref5: React.RefObject<HTMLInputElement>): void
        }

        export interface InfoTableType {
            accountPage: StateComponenents.AccountPage
            handleLogout(): void
            getAccountInfo(): void
        }

        export interface LoginType {
            accountPage: StateComponenents.AccountPage
            handleSubmit(ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>): void
            handleForm(ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLInputElement>, ref4: React.RefObject<HTMLInputElement>, ref5: React.RefObject<HTMLInputElement>): void
        }

        export interface RegistrationType {
            accountPage: StateComponenents.AccountPage
            handleForm(ref1: React.RefObject<HTMLInputElement>, ref2: React.RefObject<HTMLInputElement>, ref3: React.RefObject<HTMLInputElement>, ref4: React.RefObject<HTMLInputElement>, ref5: React.RefObject<HTMLInputElement>): void
        }
    }

    export namespace Albums {

        export interface AlbumsType {
            readonly albumsPage: StateComponenents.AlbumsPage;
            handleFormAdd(albumName: string, directories: FileList, files: FileList): void
            handleFormCreate(albumName: string): void
            turnOnRedirect(to: string): void
            getAlbums(): void
        }

        export interface AdvancePanelType {
            albumsPage: StateComponenents.AlbumsPage;
            handleFormAdd(albumName: string, directories: FileList, files: FileList): void
            handleFormCreate(albumName: string): void
        }
    }

    export namespace EqualAlbum {
        export interface EqualAlbumType {
            readonly name: string
            readonly equalAlbumPage: StateComponenents.EqualAlbumPage
            handleFormAdd(albumName: string, directories: FileList, files: FileList): void
            turnOffRedirect(): void
            handleDeleteAlbum(albumName: string): void
            turnOnGoBack(): void
            getEqualAlbumPhotos(albumName: string, offset: number, page: number): void
            turnOnFullMedia(thumbnail: string, type: "photos" | "videos"): void
            turnOffFullMedia(): void
        }
        export interface AdvancedPanelType {
            readonly name: string;
            readonly switched: boolean;
            onSwitch: () => void
            handleFormAdd(albumName: string, directories: FileList, files: FileList): void;
            handleDeleteAlbum(albumName: string): void;
        }
    }

    export namespace Media {
        export interface MediaType {
            readonly mediaPage: StateComponenents.MediaPage;
            handleSubmit(f: FileList): void;
            handleChange(tag: string, mediaPage: StateComponenents.MediaPage, type: "photos" | "videos"): void
            getMedia(offset: number, page: number): void
            turnOnFullMedia(thumbnail: string, type: "photos" | "videos"): void
            turnOffFullMedia(): void
        }

        export interface AdvancedPanelType {
            readonly mediaPage: StateComponenents.MediaPage;
            readonly switched: boolean
            onSwitch: () => void
            handleSubmit(f: FileList): void;
            handleChange(tag: string, mediaPage: StateComponenents.MediaPage, type: "photos" | "videos"): void
        }
    }
}

export namespace Reducers {
    export namespace AppReducer {
        export interface IAppReducer {
            type: string
        }

        export const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";
    }
    export namespace MediaReducer {
        export interface IMediaActions {
            type: string;
            data?: any
        }

        export const GET_MEDIA_SUCCESS = "GET-MEDIA-SUCCESS";
        export const GET_MEDIA_ERROR = "GET-MEDIA-ERROR";
        export const TURN_ON_UPDATE = "TURN-ON-UPDATE"
        export const TURN_OFF_UPDATE = "TURN-OFF-UPDATE"
        export const TURN_ON_FULL_MEDIA = "TURN-ON-FULL-MEDIA"
        export const TURN_OFF_FULL_MEDIA = "TURN-OFF-FULL-MEDIA"
        export const ADD_MEDIA_SUCCESS = "ADD-MEDIA-SUCCESS";
        export const ADD_MEDIA_ERROR = "ADD-MEDIA-ERROR";
        export const SET_SIMILAR_TAG = "SET-SIMILAR-TAG"
    }

    export namespace AccountReducer {
        export interface IAccountAction {
            type: string
            data?: any
            avatar?: string
        }

        export const GET_ACCOUNT_INFO_SUCCESS = "GET-ACCOUNT-INFO-SUCCESS"
        export const GET_ACCOUNT_INFO_ERROR = "GET-ACCOUNT-INFO-ERROR"
        export const GET_AVATAR_SUCCESS = "GET-AVATAR-SUCCESS"
        export const GET_AVATAR_ERROR = "GET-AVATAR-ERROR"
    }

    export namespace AuthenticationReducer {
        export interface IAuthAction {
            type: string
        }

        export const SIGN_OUT_SUCCESS = "SIGN-OUT-SUCCESS";
        export const SIGN_OUT_ERROR = "SIGN-OUT-ERROR";
        export const SIGN_IN_SUCCESS = "SIGN-IN-SUCCESS";
        export const SIGN_IN_ERROR = "SIGN-IN-ERROR";
        export const SIGN_UP_SUCCESS = "SIGN-UP-SUCCESS"
        export const SIGN_UP_ERROR = "SIGN-UP-ERROR"
        export const TURN_OFF_SIGNED_UP = "TURN-OFF-SIGNED-UP"
        export const CHECK_AUTH_SUCCESS = "CHECK-AUTH-SUCCESS";
        export const CHECK_AUTH_ERROR = "CHECK-AUTH-ERROR";
    }

    export namespace AlbumsReducer {
        export interface IAlbumsActions {
            type: string
            data?: any
        }

        export const GET_ALBUMS_SUCCESS = "GET-ALBUMS-SUCCESS"
        export const GET_ALBUMS_ERROR = "GET-ALBUMS-ERROR"
        export const CREATE_ALBUM_SUCCESS = "CREATE-ALBUM-SUCCESS";
        export const CREATE_ALBUM_ERROR = "CREATE-ALBUM-ERROR";
        export const TURN_ON_UPDATE = "TURN-ON-UPDATE"
        export const TURN_OFF_UPDATE = "TURN-OFF-UPDATE"
        export const TURN_ON_REDIRECT = "TURN-ON-REDIRECT"
        export const TURN_OFF_REDIRECT = "TURN-OFF-REDIRECT"
    }

    export namespace EqualAlbumReducer {
        export interface IEqualAlbumActions {
            type: string
            data?: any
        }

        export const DELETE_ALBUM_SUCCESS = "DELETE-ALBUM-SUCCESS";
        export const DELETE_ALBUM_ERROR = "DELETE-ALBUM-ERROR";
        export const ADD_TO_ALBUM_SUCCESS = "ADD-TO-ALBUM-SUCCESS";
        export const ADD_TO_ALBUM_ERROR = "ADD-TO-ALBUM-ERROR";
        export const GET_EQUAL_ALBUM_SUCCESS = "GET-EQUAL-ALBUM-SUCCESS"
        export const GET_EQUAL_ALBUM_ERROR = "GET-EQUAL-ALBUM-ERROR"
        export const GET_FULL_MEDIA_SUCCESS = "GET-FULL-MEDIA-SUCCESS"
        export const GET_FULL_MEDIA_ERROR = "GET-FULL-MEDIA-ERROR"
        export const TURN_ON_GO_BACK = "TURN-ON-GO-BACK"
        export const TURN_OFF_GO_BACK = "TURN-OFF-GO-BACK"
        export const TURN_ON_FULL_MEDIA = "TURN-ON-FULL-MEDIA"
        export const TURN_OFF_FULL_MEDIA = "TURN-OFF-FULL-MEDIA"
        export const TURN_ON_UPDATE = "TURN-ON-UPDATE"
        export const TURN_OFF_UPDATE = "TURN-OFF-UPDATE"
    }
}

export namespace HOCs {
    export interface WithAuth {
        isAuthed: boolean
    }
}