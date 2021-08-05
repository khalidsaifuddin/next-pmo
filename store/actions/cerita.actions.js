import axios from 'axios/index';

export async function getCerita(params, api_base){
  const request = await axios.get(api_base+'/cerita', {
      params: params
  });

  return request
}