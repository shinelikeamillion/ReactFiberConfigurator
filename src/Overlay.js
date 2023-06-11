import { Logo } from "@pmndrs/branding";
import {
  AiFillCamera,
  AiOutlineHighlight,
  AiOutlineLeft,
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
      <Customizer/>
    </section>
  </div>
);

const Customizer = () => {
  const colors = ['#ccc', '#efbd4e', '#80c670', '#726de8', '#ef674e', '#353934']
  const decals = ['react', 'three2', 'pmndrs']
  return  <section key="custom">
    <div className="customizer">
      <div className="color-options">
        {colors.map(color => (
          <div key={color} className="circle" style={{background: color}} />
        ))}
      </div>
    </div>
    <div className="decals">
      <div className="decals--container">
        {decals.map(decal => (
          <div key={decal} className="decal">
            <img src={decal+'_thumb.png'} alt="brand"/>
            </div>
        ))}
      </div>
    </div>

    <button className="share" style={{background: 'black'}} >DOWNLOAD<AiFillCamera size='1.3em'/></button>
    <button className="exit" style={{background: 'black'}} >GO BACK<AiOutlineLeft size='1.3em'/></button>
  </section>
}

export default Overlay;
