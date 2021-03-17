export default class Equipment {
  constructor(flags){

    this.data = mergeObject(this.defaultData(), flags || {}, { inplace: false });
    // define variables for all item slots

    this.bodyA = this.data.body?.primary?.equipped
    this.headwearA = this.data.body?.primary?.headwear
    this.necklaceA = this.data.body?.primary?.necklace
    this.backA = this.data.body?.primary?.back
    this.armorA = this.data.body?.primary?.armor
    this.ringLeftA = this.data.body?.primary?.ringLeft
    this.ringRightA = this.data.body?.primary?.ringRight
    this.bracersA = this.data.body?.primary?.bracers
    this.glovesA = this.data.body?.primary?.gloves
    this.beltA = this.data.body?.primary?.belt
    this.bootsA = this.data.body?.primary?.boots

    this.bodyB = this.data.body?.secondary?.equipped
    this.headwearB = this.data.body?.secondary?.headwear
    this.necklaceB = this.data.body?.secondary?.necklace
    this.backB = this.data.body?.secondary?.back
    this.armorB = this.data.body?.secondary?.armor
    this.ringLeftB = this.data.body?.secondary?.ringLeft
    this.ringRightB = this.data.body?.secondary?.ringRight
    this.bracersB = this.data.body?.secondary?.bracers
    this.glovesB = this.data.body?.secondary?.gloves
    this.beltB = this.data.body?.secondary?.belt
    this.bootsB = this.data.body?.secondary?.boots

    this.handsA = this.data.hands?.handSetA?.equipped
    this.primaryHandA = this.data.hands?.handSetA?.primaryHand
    this.secondaryHandA = this.data.hands?.handSetA?.secondaryHand

    this.handsB = this.data.hands?.handSetA?.equipped
    this.primaryHandB = this.data.hands?.handSetB?.primaryHand
    this.secondaryHandB = this.data.hands?.handSetB?.secondaryHand

    this.handsC = this.data.hands?.handSetA?.equipped
    this.primaryHandC = this.data.hands?.handSetC?.primaryHand
    this.secondaryHandC = this.data.hands?.handSetC?.secondaryHand

    this.handsD = this.data.hands?.handSetA?.equipped
    this.primaryHandC = this.data.hands?.handSetD?.primaryHand
    this.secondaryHandC = this.data.hands?.handSetD?.secondaryHand
  }

  async defaultData() {
    return {
      body : {
        primary : {
          equipped : true,
          headwear : null,
          necklace : null,
          back : null,
          armor : null,
          ringLeft : null,
          ringRight : null,
          bracers : null,
          gloves : null,
          belt : null,
          boots : null
        },
        secondary : {
          equipped : false,
          headwear : null,
          necklace : null,
          back : null,
          armor : null,
          ringLeft : null,
          ringRight : null,
          bracers : null,
          gloves : null,
          belt : null,
          boots : null
        }
      },
      hands : {
        handSetA : {
          equipped : true,
          primaryHand : null,
          secondaryHand : null
        },
        handSetB : {
          equipped : false,
          primaryHand : null,
          secondaryHand : null
        },
        handSetC : {
          equipped : false,
          primaryHand : null,
          secondaryHand : null
        },
        handSetD : {
          equipped : false,
          primaryHand : null,
          secondaryHand : null
        }
      }
    }
  }

  serializeData() {
    return {
      body : {
        primary : {
          equipped : this.bodyA,
          headwear : this.headwearA,
          necklace : this.necklaceA,
          back : this.backA,
          armor : this.armorA,
          ringLeft : this.ringLeftA,
          ringRight : this.ringRightA,
          bracers : this.bracersA,
          gloves : this.glovesA,
          belt : this.beltA,
          boots : this.bootsA
        },
        secondary : {
          equipped : this.bodyB,
          headwear : this.headwearB,
          necklace : this.necklaceB,
          back : this.backB,
          armor : this.armorB,
          ringLeft : this.ringLeftB,
          ringRight : this.ringRightB,
          bracers : this.bracersB,
          gloves : this.glovesB,
          belt : this.beltB,
          boots : this.bootsB
        }
      },
      hands : {
        handSetA : {
          equipped : this.handsA,
          primaryHand : this.primaryHandA,
          secondaryHand : this.secondaryHandA
        },
        handSetB : {
          equipped : this.handsB,
          primaryHand : this.primaryHandB,
          secondaryHand : this.secondaryHandB
        },
        handSetC : {
          equipped : this.handsC,
          primaryHand : this.primaryHandC,
          secondaryHand : this.secondaryHandC
        },
        handSetD : {
          equipped : this.handsD,
          primaryHand : this.primaryHandD,
          secondaryHand : this.secondaryHandD
        }
      }
    }
  }

  update(actor) {
    actor.update({
      flags: {
       'tidy5e-actions-helper' : this.serializeData()
      }
    })
  }

  get equipmentBody () {
    console.log('test')
  }

  get equipmentgloves () {
    console.log('test')
  }
}