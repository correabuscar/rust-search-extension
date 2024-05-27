import caniuseIndex from "./index/caniuse.js";
import booksIndex from "./index/books.js";
import commandsIndex from "./index/commands.js";
import labelsIndex from "./index/labels.js";
import lintsIndex from "./index/lints.js";
import rfcsIndex from "./index/rfcs.js";
import rustcIndex from "./index/rustc.js";
import targetsIndex from "./index/targets.js";
import searchIndex from "./index/std-docs.js";
import { mapping, crateIndex } from "./index/crates.js";
import storage from "./core/storage.js";
import IndexSetter from "./index-setter.js";

// Query all storage by this method:
// chrome.storage.local.get(null, function(result) {
//     console.log('Value currently is ', result);
// });

export default class IndexManager extends IndexSetter {
    static async getStdStableIndex() {
        // Convert default map searchIndex to Object since rust 1.76.0
        return await storage.getItem('index-std-stable') || Object.fromEntries(searchIndex);
    }

    static async getStdNightlyIndex() {
        // Convert default map searchIndex to Object since rust 1.76.0
        return await storage.getItem('index-std-nightly') || Object.fromEntries(searchIndex);
    }

    static async getBookIndex() {
        return await storage.getItem('index-book') || booksIndex;
    }

    static async getLabelIndex() {
        return await storage.getItem('index-label') || labelsIndex;
    }

    static async getRfcIndex() {
        return await storage.getItem('index-rfc') || rfcsIndex;
    }

    static async getCrateMapping() {
        return await storage.getItem('index-crate-mapping') || mapping;
    }

    static async getCrateIndex() {
        return await storage.getItem('index-crate') || crateIndex;
    }

    static async getLintIndex() {
        return await storage.getItem('index-lint') || lintsIndex;
    }

    static async getCaniuseIndex() {
        return await storage.getItem('index-caniuse') || caniuseIndex;
    }

    static async getRustcIndex() {
        return await storage.getItem('index-rustc') || rustcIndex;
    }

    static async getTargetIndex() {
        return await storage.getItem('index-target') || targetsIndex;
    }

    static async getCommandIndex() {
        let index = await storage.getItem('index-command');
        if (index) {
            // commandsIndex would update if the new version installed.
            // So we should override the old cache one.
            if (Object.keys(index).length < Object.keys(commandsIndex).length) {
                this.setCommandIndex(commandsIndex);
                return commandsIndex;
            }
            return index;
        }
        return commandsIndex;
    }
};