import axios from 'axios/index';

export async function getRumpunKategori(params, api_base){
  const request = await axios.get(api_base+'/rumpun_kategori', {
      params: params
  });

  return request
}

export async function getKategori(params, api_base){
  const request = await axios.get(api_base+'/kategori', {
      params: params
  });

  return request
}