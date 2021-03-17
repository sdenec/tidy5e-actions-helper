import Equipment from './app/equipment.js'

export async function equipmentTab(app, html, data) {
  
  let actor = game.actors.entities.find(a => a.data._id === data.actor._id);
  let actorId = actor.data._id;
  console.log(actor);
  let equipmentSlots = new Equipment(actor.data.flags['tidy5e-actions-helper']);
  // log actor
  
  let sheet = html.find('.sheet-body').closest('.window-content');
  // log sheet
  console.log(sheet);
  
  let equipmentTabHtml = $(await renderTemplate('modules/tidy5e-actions-helper/templates/equipmentTab.hbs'), equipmentSlots);
  console.log(equipmentTabHtml);
  sheet.append(equipmentTabHtml);

  let equipmentTab = html.find('#t5eah-equipmentTab');

  let equipSet = html.find('#t5eah-equipmentTab .setContainer h2');
  equipSet.on('click', function(){
    $(this).closest('.wrapper').find('.setContainer.equipped').removeClass('equipped');
    $(this).closest('.setContainer').addClass('equipped');
  })
  
  let dragItem = sheet.find('.inventory .item');
  let dropItem = sheet.find('#t5eah-equipmentTab .itemSlot');

  dragItem.each((i, item) => { 
    item.addEventListener('dragstart', 
      function(){ 
        console.log('Actions Helper DragStart')
        // console.log(dropItem)
    });
  });

  dropItem.each((i, slot) => { 
    slot.addEventListener('drop', 
    function(e){ 
      // let itemId = $(this).find('.item').data('item-id');
      let itemSlot = $(this).find('.item').data('item-slot');
      // console.log(`Actions Helper Drop ${itemId} in ${itemSlot}`);
      onDrop(e, itemSlot);
    });
  });

  
    async function onDrop(evt, itemSlot) {
        evt.preventDefault();

        console.log(evt);

        console.log(itemSlot);

        let data;
        try {
            data = JSON.parse(evt.dataTransfer.getData('text/plain'));
            if(actor.data._id != data.actorId) {
              return;
            }
            // if(!this.magicItem.support(data.type)) {
                // return;
            // }
        } catch (err) {
            return false;
        }

        // this['tidy5e-actions-helper'].magicItem.equipped = evt.target.checked;

        console.log(data)
        console.log(data.data.type)
        console.log(data.data._id)

        // let pack = data.pack;
        // let entity;
        // if (pack) {
        //     entity = await MAGICITEMS.fromCollection(pack, data.id);
        // } else {
        //     pack = 'world';
        //     const cls = CONFIG[data.type].entityClass;
        //     entity = cls.collection.get(data.id);
        // }

        // if(entity && this.magicItem.compatible(entity)) {
        //     this.magicItem.addEntity(entity, pack);
        //     this.render();
        // }
    }

    let labelTimer;
    let labelDelay = 500;

    $('.itemSlot').on('mouseenter', function(e){
      let tempLabel = $(`<div id="t5eahSlotLabel"></div>`);
      let label = $(this).find('.label');
      
      label.clone().appendTo(tempLabel);
      sheet.append(tempLabel);
      positionLabel(e);
      labelTimer = setTimeout(function(){
        tempLabel.fadeIn(100);
      }, labelDelay);
    });
    
    $('.itemSlot').on('mouseleave', function(){
      clearTimeout(labelTimer);
      let tempLabel = $('#t5eahSlotLabel');
      tempLabel.remove();
    })

    $(equipmentTab).on('mousemove', function(e){
      positionLabel(e);
    })

    function positionLabel(e){
      let mousePos = {x: e.clientX, y:e.clientY};
      let tempLabel = $('#t5eahSlotLabel');
      if(tempLabel){
        tempLabel.css({
          'left': `${mousePos.x}px`,
          'top': `${mousePos.y - 24}px`
        })
      }
    }

}