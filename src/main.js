/* global window */
import Mads, { fadeOutIn } from 'mads-custom';
import Velocity from 'velocity-animate';
import './main.css';

class AdUnit extends Mads {
  constructor() {
    super();

    window.leadGenCallback = this.callback.bind(this);
  }

  callback(resp) {
    if (resp.status) {
      fadeOutIn(this.elems.second, this.elems.third, {
        display: 'flex',
      });
      this.tracker('E', 'submitted');
    } else {
      throw new Error(resp.message);
    }
  }

  render() {
    return `
      <div class="container" id="ad-container">
        <img src="img/ALGOTECH2-BIGLOGO.png" id="logo" />
        <div id="first" class="page">
          <img src="img/ALGOTECH2-FORGET-EVERYTHING.png" id="forget" class="abs" />
          <img src="img/ALGOTECH2-JOIN-ATS.png" id="join" class="abs" />
          <img src="img/ALGOTECH2-2017YIELD.png" id="yield" class="abs" />
          <img src="img/ALGOTECH2-WOMAN.png" id="woman" class="abs" />
          <img src="img/ALGOTECH2-GETFREECONSUL.png" id="consul" class="abs" />
        </div>
        <div id="second" class="page hide">
          <img src="img/ALGOTECH2-S&K.png" id="sk" />
          <form id="form">
            <input name="name" placeholder="Name" id="inputName" type="text" required />
            <input name="phone" placeholder="Phone" id="inputPhone" type="number" required />
            <input name="email" placeholder="Email" id="inputEmail" type="email" required />
            <input type="image" src="img/ALGOTECH2-SEND.png" id="inputSubmit" />
          </form>
        </div>
        <div id="third" class="page hide">
          <img src="img/ALGOTECH2-THANKU.png" />
        </div>
      </div>
    `;
  }

  postRender() {
    setTimeout(() => {
      Velocity(this.elems.logo, { top: 5, scaleX: 0.5, scaleY: 0.5 }, { duration: 400 });
    }, 600);

    setTimeout(() => {
      Velocity(this.elems.forget, { left: 0 }, { duration: 400 });
    }, 1000);

    setTimeout(() => {
      Velocity(this.elems.join, { left: 0 }, { duration: 400 });
    }, 1600);

    setTimeout(() => {
      Velocity(this.elems.yield, { left: -21 }, { duration: 400 });
    }, 2000);

    setTimeout(() => {
      Velocity(this.elems.woman, { bottom: 0 }, { duration: 400 });
    }, 2400);

    setTimeout(() => {
      Velocity(this.elems.consul, { left: 20 }, { duration: 400 });
    }, 3000);

    setTimeout(() => {
      this.elems.first.addEventListener('mousedown', () => {
        fadeOutIn(this.elems.first, this.elems.second, {
          display: 'block',
        });
        this.tracker('E', 'click');
      });
    }, 3500);
  }

  style() {
    return [
      `
      #ad-container {
        background: url(img/ALGOTECH2.png)
      }
      #form.loading::after {
        background: rgba(255, 255, 255, 0.6);
        position: absolute;
        width: 100%;
        height: 100%;
        content: 'Please wait...';
        display: flex;
        justify-content: center;
        align-items: center;
      }
      `];
  }

  events() {
    this.elems.form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        this.elems.inputSubmit.setAttribute('disabled', 'disabled');
        this.elems.form.className = 'loading';
        this.loadJS(`https://www.mobileads.com/api/save_lf?contactEmail=jeff@mobileads.com&gotDatas=1&element=[{%22fieldname%22:%22text_1%22,%22value%22:%22${this.elems.inputName.value}%22,%22required%22:%22required%22},{%22fieldname%22:%22text_2%22,%22value%22:%22${this.elems.inputPhone.value}%22,%22required%22:%22required%22},{%22fieldname%22:%22text_3%22,%22value%22:%22${this.elems.inputEmail.value}%22,%22required%22:%22required%22}]&user-id=4055&studio-id=1&tab-id=1&trackid=2615&referredURL=${window.location.href}&callback=leadGenCallback&_=${+Date.now()}`) // eslint-disable-line
        this.tracker('E', 'submit');
      } catch (err) {
        this.elems.form.className = '';
        this.elems.inputSubmit.removeAttribute('disabled');
        console.log(err);
      }
    });
  }
}

window.ad = new AdUnit();
