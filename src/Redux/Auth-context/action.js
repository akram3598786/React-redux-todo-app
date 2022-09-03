import { IS_AUTH } from "./action-type.js"

export const isAuth=(authFlg)=>{
  return {
    type : IS_AUTH,
    payload : authFlg
  }
}