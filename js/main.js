import 'babel-polyfill/dist/polyfill';
import 'whatwg-fetch';
import Application from "./application";

const overlay = document.querySelector(`.overlay`);
overlay.style.display = `none`;

Application.start();
