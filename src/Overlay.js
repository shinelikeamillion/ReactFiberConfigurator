import { Logo } from "@pmndrs/branding";
import {
  AiOutlineHighlight,
  AiOutlineLineHeight,
  AiOutlineShopping,
} from "react-icons/ai";

const Overlay = () => <Intro />;

const Intro = () => (
  <div className="container">
    <header>
      <Logo with="40" height="40" />
      <AiOutlineShopping size="3em" />
    </header>
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
          <button style={{ background: "black" }}>
            CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default Overlay;
