import { Logo } from "@pmndrs/branding";
import {
  AiFillCamera,
  AiOutlineHighlight,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";

import { useSnapshot } from "valtio";
import { state } from "./store";
import {AnimatePresence, motion} from 'framer-motion'

const Overlay = () => {
  const snap = useSnapshot(state);
  const transition={type:'spring', duration: .8}
  const config = {
    initial: {x: -100, opacity: 0, transition: {...transition, delay:.5}},
    animate: {x: 0, opacity: 1, transition: {...transition, delay:0}},
    exit: {x: -100, opacity: 0, transition: {...transition, delay:0}}
  }
  return (
    <div className="container">
      <motion.header
      initial={{opacity:0, y: -20}}
      animate={{opacity:1, y: 0}}
      transition={{type:'spring', duration: 1.8, delay:1}}>
        <Logo with="40" height="40" />
        <AiOutlineShopping size="3em" />
      </motion.header>
      <AnimatePresence>

      {snap.intro ? <Intro key='main' config={config} /> : <Customizer key='custom' config={config} />}
      </AnimatePresence>
    </div>
  );
};

const Intro = ({config}) => (
  <motion.section className="main" {...config}>
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
  </motion.section>
);

const Customizer = ({config}) => {
  const snap = useSnapshot(state);
  return (
    <motion.section key="custom" {...config}>
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
      <button className="share" style={{ background: state.selectedColor }}
      onClick={()=>{
        const link = document.createElement('a')
        link.setAttribute('download', 'canvas.png')
        link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-steam'))
        link.click()
      }}
      >
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
    </motion.section>
  );
};

export default Overlay;
