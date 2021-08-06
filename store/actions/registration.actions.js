import axios from 'axios/index';

export async function getJenisPendaftaran(params, api_base){
  const request = await axios.get(api_base+'/jenis_pendaftaran', {
      params: params
  })

  return request
}

export async function simpanPendaftaran(params, api_base){
  const request = await axios.post(api_base+'/registration', {
    ...params
  })

  return request
}