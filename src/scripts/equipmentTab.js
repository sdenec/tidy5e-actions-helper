import Equipment from './app/equipment.js'

export async function equipmentTab(app, html, data) {
  if(!html[0].classList.contains("sheet")){
    html = html.closest(".sheet");
  }
  
  const actor = game.actors.entities.find(a => a.data._id === data.actor._id);
  const equipmentSlots = new Equipment(actor, html);
  const sheet = html.find('.sheet-body').closest('.window-content');
  const equipmentTabHtml = $(await renderTemplate('modules/tidy5e-actions-helper/templates/equipmentTab.hbs', equipmentSlots));

  sheet.append(equipmentTabHtml);

  equipmentSlots.checkItemsExist();

  const equipmentTab = sheet.find('#t5eah-equipmentTab');

  // Event Listener

  const equipSet = equipmentTab.find('.setContainer h2');
  const dragItem = equipmentTab.find('.itemSlot .item');
  const dropItem = equipmentTab.find('.itemSlot');
  const removeItem = equipmentTab.find('.itemSlot .remove');

  equipSet.on('click', function(){
    const equipped = $(this).closest('.setContainer').hasClass('equipped');
    if(!equipped) $(this).closest('.wrapper').find('.setContainer.equipped').removeClass('equipped');
    $(this).closest('.setContainer').toggleClass('equipped');
    equipmentSlots.updateSets();
  })
  
  removeItem.on('click', function(){
    $(this).closest('.itemSlot').find('.item').attr('data-id', null);
    equipmentSlots.updateSets();
  })

  dragItem.each((i, item) => { 
    item.addEventListener('dragstart', 
      function(evt){
        // console.log('Actions Helper DragStart')
        let itemId = $(this).attr('data-id');
        $(this).attr('data-id', null);
        let obj = { "actorId" : actor._id};
        obj.data = actor.getOwnedItem(itemId);
        let data = JSON.stringify(obj);
        evt.dataTransfer.setData("text/plain", data);
    });
  });

  dropItem.each((i, slot) => { 
    slot.addEventListener('drop', 
    function(evt){
      let itemSlot = $(this).find('.item').data('slot');
      let itemId = onDrop(evt);
      $(this).find('.item').attr('data-id', itemId);
      console.log(`Actions Helper Drop ${itemId} in ${itemSlot}`);
      equipmentSlots.updateSets();
    });
  });

  function onDrop(evt) {
    evt.preventDefault();

    let data;
    try {
      data = JSON.parse(evt.dataTransfer.getData('text/plain'));
      if(actor.data._id != data.actorId) {
        return;
      }
      // check if item is valid for slot placement
      // else return and show notice
      // console.log(data.data.type)
      equipmentSlots.checkValidItem(slotRequirement);
      
      // if(!this.magicItem.support(data.type)) {
          // return;
          // }
    } catch (err) {
      return false;
    }
        
    console.log(data);
    return data.data._id;
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
        'top': `${mousePos.y - 36}px`
      })
    }
  }

}