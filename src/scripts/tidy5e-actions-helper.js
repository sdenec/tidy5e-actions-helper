// import * as settings from './settings.js';

export class Tidy5eActionsHelper extends Application {
    // i18n = (toTranslate) => game.i18n.localize(toTranslate);

    refresh_timeout = null;
    // tokens = null;
    // rendering = false;
    // categoryHovered = '';
    // defaultLeftPos = 150;
    // defaultTopPos = 80;

    // constructor() {
        // super();
    // }

    // async init(user) {
        // this.actions = await this.systemManager.getActionHandler(user);

        // this.rollHandler = this.systemManager.getRollHandler();
        // this.filterManager = this.systemManager.getFilterManager();
        // this.categoryManager = this.systemManager.getCategoryManager();
    // }

    // updateSettings() {
    //     this.updateRollHandler();
    //     this.update();
    // }

    // updateRollHandler() {
        // this.rollHandler = this.systemManager.getRollHandler();
    // }

    // setTokensReference(tokens) {
        // this.tokens = tokens;
    // }

    /** @override */
    static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
        template: '/modules/tidy5e-actions-helper/templates/template.hbs',
        id: 'tidy5e-actions-helper',
        classes: [],
        width: 200,
        height: 20,
        left: 150,
        top: 80,
        scale: 1,
        popOut: false,
        minimizable: false,
        resizable: false,
        title: 'tidy5e-actions-helper',
        dragDrop: [],
        tabs: [],
        scrollY: []
        });
    }

    // getScale() {
    //     const scale = parseFloat(settings.get('scale'));
        
    //     if (scale < 0.8)
    //         return 0.8;

    //     if (scale > 2)
    //         return 2;

    //     return scale;
    // }

    /** @override */
    getData(options = {}) {
        const data = super.getData();
        // data.actions = this.targetActions;
        data.id = 'tidy5e-actions-helper';
        // data.hovering = settings.get('onTokenHover');;
        // data.scale = this.getScale();
        // settings.Logger.debug('HUD data:', data);
        return data;
    }

    /** @override */
    activateListeners(html) {
        // const tokenactionhud = '#tidy5e-actions-helper';
        // const action = '.tidy5e-actions-helper-action';   

        // const handleClick = e => {
        //     let target = e.target;

        //     if (target.tagName !== 'BUTTON')
        //         target = e.currentTarget.children[0];

        //     let value = target.value;
        //     try {
        //         this.rollHandler.handleActionEvent(e, value);
        //     } catch (error) {
        //         settings.Logger.error(e);
        //     }
        // }

        // html.find(action).on('click', e => {
        //     handleClick(e);
        // });
    }
      
    update() {
        // Delay refresh because switching tokens could cause a controlToken(false) then controlToken(true) very fast
        if (this.refresh_timeout)
            clearTimeout(this.refresh_timeout)
        this.refresh_timeout = setTimeout(this.updateHud.bind(this), 100)
    }

    async updateHud() {
        // settings.Logger.debug('Updating HUD');

        // let token = this._getTargetToken(this.tokens?.controlled);

        // let multipleTokens = this.tokens?.controlled.length > 1 && !token;
        // this.targetActions = await this.actions.buildActionList(token, multipleTokens);

        // if (!this.showHudEnabled()) {
            // this.close();
            // return;
        // }

        // this.rendering = true;
        this.render(true);
    }

    // Really just checks if only one token is being controlled. Not smart.
    // validTokenChange(token) {
    //     if (settings.get('alwaysShowHud'))
    //         return this.isRelevantToken(token) || token.actorId === game.user.character?._id;
    //     else
    //         return this.isRelevantToken(token);
    // }

    // isRelevantToken(token) {
    //     let controlled = this.tokens?.controlled;
    //     return controlled?.some(t => t.id === token._id) || (controlled?.length === 0 && canvas?.tokens?.placeables?.some(t => t.id === this.targetActions?.tokenId));
    // }

    // Is something being hovered on, is the setting on, and is it the token you're currently selecting.
    // validTokenHover(token, hovered) {
    //     return hovered && settings.get('onTokenHover') && token._id === this.targetActions?.tokenId;
    // }

    // Basically update any time. All this logic could be improved.
    // validActorOrItemUpdate(actor) {
    //     settings.Logger.debug(`actor change, comparing actors`);
    //     settings.Logger.debug(`actor._id: ${actor._id}; this.targetActions.actorId: ${this.targetActions?.actorId}`);

    //     if (!actor) {
    //         settings.Logger.debug('No actor, possibly deleted, should update HUD.');
    //         return true;
    //     }
            
    //     if (this.targetActions && actor._id === this.targetActions.actorId) {
    //         settings.Logger.debug('Same actor IDs, should update HUD.');
    //         return true;
    //     }

    //     settings.Logger.debug('Different actor, no need to update HUD.');
    //     return false;
    // }

    // showHudEnabled() {
    //     settings.Logger.debug('showHudEnabled()', `isGM: ${game.user.isGM}`, `enabledForUser: ${settings.get('enabledForUser')}`, `playerPermission: ${settings.get('playerPermission')}`);

    //     if (!settings.get('enabledForUser'))            
    //         return false;

    //     return (settings.get('playerPermission') || game.user.isGM);
    // }

    // isLinkedCompendium(compendiumKey) {
    //     settings.Logger.debug('Compendium hook triggered. Checking if compendium is linked.')
    //     return this.categoryManager.isLinkedCompendium(compendiumKey);
    // }

    /** @private */
    // _getTargetToken(controlled) {
    //     if (controlled.length > 1)
    //         return null;

    //     if (controlled.length === 0 && canvas.tokens?.placeables && game.user.character) {
    //         if (!settings.get('alwaysShowHud'))
    //             return null;
            
    //         let character = game.user.character
    //         let token = canvas?.tokens?.placeables.find(t => t.actor?._id === character?._id)
    //         if (token)
    //             return token;
            
    //         return null;
    //     }

    //     let ct = controlled[0];

    //     if (!ct)
    //         return null;

    //     if(this._userHasPermission(ct))
    //         return ct;
            
    //     return null;
    // }

    /** @private */
    // _userHasPermission(token = '') {
    //     let actor = token.actor;
    //     let user = game.user;
    //     return game.user.isGM || actor?.hasPerm(user, "OWNER");
    // }
}
