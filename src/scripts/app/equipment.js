export default class Equipment {
  constructor(sourceActor, html){
    this.sourceActor = sourceActor;
    console.log(this.sourceActor)
    this.html = html;
    this.setData = this.sourceActor.getFlag("tidy5e-actions-helper", "data");
    // this.setData = this.sourceActor.getFlag("tidy5e-actions-helper", "empty");
    console.log(this.setData);
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
      let obj = {};
      obj.slotType = element;
      let translationString = `T5EAH.Equipment.${element.charAt(0).toUpperCase() + element.slice(1)}`;
      obj.slotName = game.i18n.localize(translationString);
      obj.itemId = this.getItemId(setType, set, element);
      obj.slotState = this.slotInUse(setType, set, element);
      obj.itemImage = this.getItemImage(setType, set, obj.itemId);
      slots.push(obj);
    });

    return slots;
  }

  getItemId(setType=null, set=null, slot=null){
    let id = this.setData?.[setType]?.[set]?.[slot];
    if(id) return id;
    return undefined;
  }

  getItemImage(setType=null, set=null, itemId=null){
    let image = "path/to/image";
    return image;
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
      let setType = el.dataset.type;
      let obj = {};
      obj.equipped = el.classList.contains("equipped");
      // console.log(el);
      $(el).find('.item').each( (i, el) => {
        console.log(el)
        let itemSlot = el.dataset.slot;
        let itemId = el.dataset.id;
        if(itemId) {
          obj[`${itemSlot}`] = itemId;
        } else {
          obj[`${itemSlot}`] = null;
        }
      });
      data[setType].push(obj);
    });

    console.log("updating sets!")
    await this.sourceActor.setFlag("tidy5e-actions-helper", "data", data);
  }
}