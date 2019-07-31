import * as dblib from '../src/lib/DBLib.js';
/**
 * This variable will hold objects that should be globally accessible within the application
 * inventoryList: an array of JSON inventory item objects
 * userList: an array of JSON user objects
 * currentUser: authenticated user + permissions
 */

export var GlobalStateVar = {
  currentUser: null
}


/**
* This function should take an update object that matches the global state attribute, like {inventoryList: mynewlist}
*/

export const updateCurrentUser = user => {
  GlobalStateVar = {currentUser: user}
}


export const GlobalState = () => {
  return GlobalStateVar
}
