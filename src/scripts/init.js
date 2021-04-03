import {handlebars} from "./app/handlebars.js";
import {equipmentTab} from './equipmentTab.js';

Hooks.on('init', () => {
    handlebars();
});

Hooks.on(`renderActorSheet`, (app, html, data) => {
  console.log("render Tab!")
  equipmentTab(app, html, data);
});