import Equipment from './app/equipment.js'

export async function equipmentTab(app, html, data) {
  
  let actor = game.actors.entities.find(a => a.data._id === data.actor._id);
  console.log(actor);
  let equipmentSlots = new Equipment(actor.data.flags['tidy5e-actions-helper']);
  // log actor
  
  let sheet = html.find('.sheet-body').closest('.window-content');
  // log sheet
  console.log(sheet);
  
  let equipmentTabHtml = $(await renderTemplate('modules/tidy5e-actions-helper/templates/equipmentTab.hbs'), equipmentSlots);
  console.log(equipmentTabHtml);
  sheet.append(equipmentTabHtml);

  /*
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
  */
}