import Equipment from './app/equipment.js'

export async function equipmentTab(app, html, data) {
  if(!html[0].classList.contains("sheet")){
    html = html.closest(".sheet");
  }
  
  let actor = game.actors.entities.find(a => a.data._id === data.actor._id);
  let equipmentSlots = new Equipment(actor, html);
  
  let sheet = html.find('.sheet-body').closest('.window-content');
  
  let equipmentTabHtml = $(await renderTemplate('modules/tidy5e-actions-helper/templates/equipmentTab.hbs', equipmentSlots));
  sheet.append(equipmentTabHtml);

  let equipmentTab = $('#t5eah-equipmentTab');

  // Event Listener

  let equipSet = equipmentTab.find('.setContainer h2');
  equipSet.on('click', function(){
    let equipped = $(this).closest('.setContainer').hasClass('equipped');
    if(!equipped) $(this).closest('.wrapper').find('.setContainer.equipped').removeClass('equipped');
    $(this).closest('.setContainer').toggleClass('equipped');
    equipmentSlots.updateSets();
  })
  
  let dragItem = sheet.find('.inventory .item');
  let dropItem = equipmentTab.find('.itemSlot');

  dragItem.each((i, item) => { 
    item.addEventListener('dragstart', 
      function(){ 
        console.log('Actions Helper DragStart')
        // console.log(dropItem)
    });
  });

  dropItem.each((i, slot) => { 
    slot.addEventListener('drop', 
    function(evt){
      let itemSlot = $(this).find('.item').data('item-slot');
      let itemId = onDrop(evt);
      $(this).find('.item').attr('data-id', itemId);
      console.log(`Actions Helper Drop ${itemId} in ${itemSlot}`);
      equipmentSlots.updateSets();
    });
  });

  
    function onDrop(evt) {
        evt.preventDefault();

        // console.log(evt);

        // console.log(itemSlot);

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
        return data.data._id;
        // console.log(data.data.type)
        // console.log(data.data._id)

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

    // slot labels

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