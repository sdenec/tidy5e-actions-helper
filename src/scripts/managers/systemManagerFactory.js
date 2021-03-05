import { Dnd5eSystemManager } from './dnd5e.js';

export class SystemManagerFactory {
    static create(system, appName) {
        switch(system) {
            case 'dnd5e':
                return new Dnd5eSystemManager(appName);
        }
    }
}