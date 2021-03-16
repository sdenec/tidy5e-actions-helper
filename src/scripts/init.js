import {handlebars} from "./app/handlebars.js";
import {equipmentTab} from './equipmentTab.js';

Hooks.on('init', () => {
    handlebars();
});

Hooks.on(`renderActorSheet`, (app, html, data) => {
  equipmentTab(app, html, data);
});