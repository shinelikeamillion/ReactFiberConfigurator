import { proxy } from "valtio";

const state = proxy({
  intro: true,
  colors: ["#ccc", "#efbd4e", "#80c670", "#726de8", "#ef674e", "#353934"],
  selectedColor: "#efbd4e",
  decals: ["react", "three2", "pmndrs"],
});

export { state };
