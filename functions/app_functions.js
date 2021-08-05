import localforage from 'localforage'

const cekLogin = async () => {
  let sudah_login = 0
  let pengguna = {}

  sudah_login = await localforage.getItem('sudah_login')
  pengguna = await localforage.getItem('pengguna')

  let outputs = {
    sudah_login: sudah_login,
    pengguna: pengguna
  }

  return outputs
}

export default cekLogin
