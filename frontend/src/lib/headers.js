import Cookies from 'js-cookie'
const csrftoken = Cookies.get('csrftoken')

export const headers = {
  common: {
    'X-CSRF-TOKEN': csrftoken
  }
  // headers: {
  //   Authorization: `Bearer ${auth.getToken()}`
  // }
}