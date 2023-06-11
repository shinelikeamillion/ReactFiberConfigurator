import { proxy } from "valtio";

const state = proxy({
  intro: true
})

export {state}