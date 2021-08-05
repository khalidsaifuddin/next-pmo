import axios from 'axios/index';

const UPDATE_WINDOW_DIMENSION = '[APP] UPDATE_WINDOW_DIMENSION'

export default function updateWindowDimension()
{
    return (dispatch) => {
        return dispatch ({
            type   : UPDATE_WINDOW_DIMENSION,
            window_dimension: {
                height: window.innerHeight,
                width: window.innerWidth
            }
        })
    }
}

export async function login(params, api_base){
    const request = await axios.post(api_base+'/masuk', {
        ...params
    });

    return request
}

export async function getPengguna(params, api_base){
    const request = await axios.get(api_base+'/pengguna', {
        params: params
    });

    return request
}

export async function simpanIdentitasPengguna(params, api_base){
    const request = await axios.post(api_base+'/identitas_pengguna', {
        ...params
    });

    return request
}

export async function getIdentitasPengguna(params, api_base){
    const request = await axios.get(api_base+'/identitas_pengguna', {
        params: params
    });

    return request
}