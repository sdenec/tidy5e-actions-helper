import { Tidy5eActionsHelper } from './tidy5e-actions-helper.js';
import { registerHandlebars } from './utilities/handlebars.js';

Hooks.on('init', () => {
    registerHandlebars();
});


async function addLoadoutTab(app, html, data) {
  
    let actor = game.actors.entities.find(a => a.data._id === data.actor._id);
    console.log(actor);
  let sheet = html.find('.sheet-body').closest('.window-content');
  console.log(sheet);
  
  let loadoutHtml = $(await renderTemplate('modules/tidy5e-actions-helper/templates/equipment.hbs'), data);
  console.log(loadoutHtml);
  sheet.append(loadoutHtml);

  let toggleSet = html.find('#tidy5e-loadout .equipped');
  toggleSet.on('click', function(){
    $('.weapon-set').removeClass('active');
    $(this).closest('.weapon-set').toggleClass('active');
  })
  
  let dragItem = sheet.find('.inventory .item');
  let dropItem = sheet.find('#tidy5e-equipment .item-slot');
  dragItem.each((i, item) => { 
    item.addEventListener('dragstart', 
      function(){ 
        console.log('Actions Helper DragStart')
        // console.log(dropItem)
    });
  });

  dropItem.each((i, slot) => { 
    slot.addEventListener('drop', 
      function(){ console.log(`Actions Helper Drop ${this.dataset.slot}`)
    });
  });
}

Hooks.on(`renderActorSheet`, (app, html, data) => {
  addLoadoutTab(app, html, data);
});

Hooks.on('canvasReady', async () => {
  console.log('Tidy5e Actions Helper loaded!');
  
  let user = game.user;
  
  if (!user)
  throw new Error('Tidy5e Actions Helper | No user found.')
  
  if (!game.tidy5eActionsHelper) {
    game.tidy5eActionsHelper = new Tidy5eActionsHelper();
    console.log(game.tidy5eActionsHelper);
  }
  
  game.tidy5eActionsHelper.render(true);
  console.log($('#tidy5e-actions-helper'));
  
  // game.tokenActionHUD.setTokensReference(canvas.tokens);
  
    Hooks.on('controlToken', (token, controlled) => {
      console.log("took over control of a token:"+ controlled);
      //         game.tokenActionHUD.update();  
      // game.tidy5eActionsHelper.render(true);
      $('#tidy5e-actions-helper').append($('#hotbar'));
    });

    Hooks.on()
    
    // Hooks.on('updateToken', (scene, token, diff, options, idUser) => {
    //     // If it's an X or Y change assume the token is just moving.
    //     if (diff.hasOwnProperty('y') || diff.hasOwnProperty('x'))
    //         return;
    //     if (game.tokenActionHUD.validTokenChange(token))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('deleteToken', (scene, token, change, userId) => {
    //     if (game.tokenActionHUD.validTokenChange(token))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('hoverToken', (token, hovered) => {
    //     if (game.tokenActionHUD.validTokenHover(token, hovered))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('updateActor', (actor) => {
    //     if (game.tokenActionHUD.validActorOrItemUpdate(actor))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('deleteActor', (actor) => {
    //     if (game.tokenActionHUD.validActorOrItemUpdate(actor))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('deleteOwnedItem', (source, item) => {
    //     let actor = source.data;
    //     if (game.tokenActionHUD.validActorOrItemUpdate(actor))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('createOwnedItem', (source, item) => {
    //     let actor = source.data;
    //     if (game.tokenActionHUD.validActorOrItemUpdate(actor))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('updateOwnedItem', (source, item) => {
    //     let actor = source.data;
    //     if (game.tokenActionHUD.validActorOrItemUpdate(actor))
    //         game.tokenActionHUD.update();
    // });
    
    // Hooks.on('renderTokenActionHUD', () => {
    //     game.tokenActionHUD.applySettings();
    //     game.tokenActionHUD.trySetPos();
    // });

    // Hooks.on('renderCompendium', (source, html) => {
    //     let metadata = source?.metadata;
    //     if (game.tokenActionHUD.isLinkedCompendium(`${metadata?.package}.${metadata?.name}`))
    //         game.tokenActionHUD.update();
    // });

    // Hooks.on('deleteCompendium', (source, html) => {
    //     let metadata = source?.metadata;
    //     if (game.tokenActionHUD.isLinkedCompendium(`${metadata?.package}.${metadata?.name}`))
    //         game.tokenActionHUD.update();
    // });

    // Hooks.on('createCombat', (combat) => {
    //     game.tokenActionHUD.update();
    // });
    
    // Hooks.on('deleteCombat', (combat) => {
    //     game.tokenActionHUD.update();
    // });

    // Hooks.on('updateCombat', (combat) => {
    //     game.tokenActionHUD.update();
    // });

    // Hooks.on('updateCombatant', (combat, combatant) => {
    //     game.tokenActionHUD.update();
    // });

    // Hooks.on('forceUpdateTokenActionHUD', () => {
    //     game.tokenActionHUD.update();
    // })

    // game.tokenActionHUD.update();
});