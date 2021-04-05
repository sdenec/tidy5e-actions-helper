export default class Equipment {
  constructor(sourceActor, html){
    this.sourceActor = sourceActor;
    this.html = html;
    this.setData = this.sourceActor.getFlag("tidy5e-actions-helper", "data");
    this.bodySlotTypes = ["headwear","necklace","back","armor","bracers","gloves","belt","boots","ringLeft","ringRight"];
    this.handSlotTypes = ["mainHand","offHand"];
    this.equipment = this.getData();
    return this;
  }

  getData(){
    return {
      "windowTitle" : game.i18n.localize("T5EAH.Equipment.WindowTitle"),
      "bodySet" : this.getSets("bodySet",2),
      "handSet" : this.getSets("handSet",4)
    }
  }

  getSets(setName=null,setCount=null){
    let sets = [];
    for(let i = 0; i<setCount; i++){
      let obj = {};
      obj.set = this.getSlots(setName,i);
      obj.equipState = this.setInUse(setName,i);
      sets.push(obj);
    }
    return sets;
  }

  getSlots(setType=null,set=null){
    let slotTypesArray = [];
    const slots = [];
    
    switch (setType){
      case "bodySet":
        slotTypesArray = this.bodySlotTypes;
      break;
      case "handSet":
        slotTypesArray = this.handSlotTypes;
      break;
    }

    slotTypesArray.forEach(element => {
      let translationString = `T5EAH.Equipment.${element.charAt(0).toUpperCase() + element.slice(1)}`;
      let obj = {};
      obj.slotType = element;
      obj.slotName = game.i18n.localize(translationString);
      obj.itemId = this.getItemId(setType, set, element);
      obj.slotState = this.slotInUse(setType, set, element);
      obj.itemImage = this.getItemImage(obj.itemId);
      obj.itemName = this.getItemName(obj.itemId);
      slots.push(obj);
    });

    return slots;
  }

  getItemId(setType=null, set=null, slot=null){
    let id = this.setData?.[setType]?.[set]?.[slot];
    if(id) return id;
    return undefined;
  }

  getItemImage(itemId=null){
    if(!itemId) return;
    let item = this.sourceActor.getOwnedItem(itemId);
    return item?.data?.img;
  }

  getItemName(itemId=null){
    if(!itemId) return;
    let item = this.sourceActor.getOwnedItem(itemId);
    return item?.data?.name;
  }

  slotInUse(setType=null, set=null, element=null){
    let id = this.setData?.[setType]?.[set]?.[element];
    if(!id) return undefined;
    return "equipped";
  }

  setInUse(setType=null, set=null){
    let equipped = this.setData?.[setType]?.[set]?.["equipped"];
    if(!equipped) return undefined;
    return "equipped";
  }

  async updateSets(){
    let data = {
      "bodySet" : [],
      "handSet" : []
    };
    
    this.html.find(".setContainer").each( (i, el) => {
      let obj = {};
      obj.equipped = el.classList.contains("equipped");
      $(el).find('.item').each( (i, el) => {
        let itemId = el.dataset.id;
        obj[`${el.dataset.slot}`] = itemId ? itemId : null;
      });
      data[el.dataset.type].push(obj);
    });

    // await this.updateEquipmentState();
    await this.sourceActor.setFlag("tidy5e-actions-helper", "data", data);
  }
  
  async updateEquipmentState(){
    // get Array of all unequipped items
    // get array of all equipped items
    // eliminate item from unequipped if item is equipped
    
    let actor = this.sourceActor;
    const updates = equipment.map(i => {
      return {_id: i._id, }
    })
    // actor.updateEmbeddedEntity()
  }

  checkItemsExist() {
    // check if Item is still owned by actor
    // else remove
    let itemsChanged = false;
    this.html.find(".setContainer").each( (i, el) => {
      $(el).find('.item').each( (i, el) => {
        let item = this.sourceActor.getOwnedItem(el.dataset.id);
        if(el.dataset.id && !item) {
          $(el).attr('data-id', null);
          itemsChanged = true;
        }
      });
    });
    if (itemsChanged) this.updateSets();
  }

  checkValidItem(slotRequirement) {

  }
}