// export const PHOTO_URL = "https://avatars.githubusercontent.com/u/101570965?v=4"
export const PHOTO_URL = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY
    }
}

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const SUPPORTED_LANGUAGES = [
    {
    identifier: 'en',
    name:   'English'
    },
    {
    identifier: 'hindi',
    name:   'Hindi'
    },
    {
    identifier: 'spanish',
    name:   'Spanish'
    },

];
