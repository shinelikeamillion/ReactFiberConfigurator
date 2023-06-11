import { Logo } from "@pmndrs/branding";
import {
  AiFillCamera,
  AiOutlineHighlight,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

import { useSnapshot } from "valtio";
import { state } from "./store";

const Overlay = () => {
  const snap = useSnapshot(state);
  return (
    <div className="container">
      <header>
        <Logo with="40" height="40" />
        <AiOutlineShopping size="3em" />
      </header>
      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  );
};

const Intro = () => (
  <section className="main">
    <div className="section--container">
      <div>
        <h1>LET'S DO IT.</h1>
      </div>
      <div className="support--content">
        <p>
          Create you unique and exclusive shirt with our brand-new 3D
          customization tool. <strong>Unleash your imagination</strong> and
          define your own style.
        </p>
        <button
          style={{ background: "black" }}
          onClick={() => {
            state.intro = false;
          }}
        >
          CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
        </button>
      </div>
    </div>
  </section>
);

const Customizer = () => {
  const snap = useSnapshot(state);
  return (
    <section key="custom">
      <div className="customizer">
        <div className="color-options">
          {state.colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => (state.selectedColor = color)}
            />
          ))}
        </div>
      </div>
      <div className="decals">
        <div className="decals--container">
          {state.decals.map((decal) => (
            <div
              key={decal}
              className="decal"
              onClick={() => (state.selectedDecal = decal)}
            >
              <img src={decal + "_thumb.png"} alt="brand" />
            </div>
          ))}
        </div>
      </div>

      <button
        className="exit"
        style={{ background: state.selectedColor }}
        onClick={() => {
          state.intro = true;
        }}
      >
        GO BACK
        <AiOutlineLeft size="1.3em" />
      </button>
      <button className="share" style={{ background: state.selectedColor }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
    </section>
  );
};

export default Overlay;
