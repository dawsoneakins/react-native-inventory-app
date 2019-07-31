import { db } from '../firebase-config';

// User Functions

export async function checkLogin(username, password) {
    if (username != '' && username != null) {
    let user = await getSpecificUserArrayPromise(username);
    if (user.pass === password) {
      console.log("reached")
      return user;
    }}

    return -1

}

/**
 * This will retrieve all users from the firebase database
 * @returns TODO - Either go with an array of JSON strongs (each index has one uiser's full info) or a map of users,
 * with the key being the username.
 */
export function getAllUsers() {
    var usersRef = db.ref('users');
    usersRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var firstName = childSnapshot.val().firstName;
            var lastName = childSnapshot.val().lastName;
            var phone = childSnapshot.val().phone;
            var state = childSnapshot.val().state;
            console.log("User: " + firstName + " " + lastName + " | " + phone + " | " + state);
        });
    });
}

export function getAllUsersArrayPromise() {
    return db.ref('users').once('value').then(function(snapshot) {
        var retVal = [];
        snapshot.forEach(function(childSnapshot) {
            var buildObject = {
                key: childSnapshot.key,
                email: childSnapshot.val().email,
                firstName: childSnapshot.val().firstName,
                lastName: childSnapshot.val().lastName,
                pass: childSnapshot.val().pass,
                isAdmin: childSnapshot.val().isAdmin,
                canUpdate: childSnapshot.val().canUpdate || childSnapshot.val().isAdmin,
                canAdd: childSnapshot.val().canAdd || childSnapshot.val().isAdmin,
                canDelete: childSnapshot.val().canUpdate || childSnapshot.val().isAdmin,
            };

            retVal.push(buildObject);
        });

        console.log(retVal);
        return retVal;
    });
}

/**
 * This is to retrieve a specific user's information by the name of the user.
 * @param userName - The name of the item you want to return
 * @returns - A JSON Object with all user attributes present from the database.
 * Usage example - var user = JSON.parse(getSpecificUser('testAdmin')); would give you the JSON user object for the
 * testAdmin account. You could then refer to individual attributes like user.phone and user.firstName
 */
export function getSpecificUser(userName) {
    var retVal = '{ ';
    var usersRef = db.ref('users/' + userName);
    usersRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            retVal += '"' + childSnapshot.key + '":"' + childSnapshot.val().toString() + '",';
        });
        retVal = retVal.substring(0, retVal.length - 1) + " }";
        // console.log(retVal);
        console.log(JSON.parse(retVal));
        return JSON.parse(retVal);
    });
}

export function getSpecificUserArrayPromise(id) {
    return db.ref('users/' + id).once('value').then(function(childSnapshot) {
            var buildObject = {
                key: childSnapshot.key,
                email: childSnapshot.val().email,
                firstName: childSnapshot.val().firstName,
                lastName: childSnapshot.val().lastName,
                pass: childSnapshot.val().pass,
                isAdmin: childSnapshot.val().isAdmin,
                canUpdate: childSnapshot.val().canUpdate || childSnapshot.val().isAdmin,
                canAdd: childSnapshot.val().canAdd || childSnapshot.val().isAdmin,
                canDelete: childSnapshot.val().canUpdate || childSnapshot.val().isAdmin,
            };
            return buildObject
    });
}

/**
 * Add a user to our database
 */
export function addUser(userId, firstName, lastName, email, pass, canAdd, canUpdate, canDelete, isAdmin, accountId) {
    db.ref('users/' + userId).set({
        email: email,
        firstName: firstName,
        lastName: lastName,
        pass: pass,
        canAdd: canAdd || isAdmin,
        canUpdate: canUpdate || isAdmin,
        canDelete: canDelete || isAdmin,
        isAdmin: isAdmin,
        username: userId || "user",
        active: true,
        accountId: accountId || null,
    });

}

export function getNextAccountNumber() {
  return db.ref('admin').once('value').then(function(snapshot) {
        var retVal = [];
        snapshot.forEach(function(childSnapshot) {
            var buildObject = {
                key: childSnapshot.key,
                accountNum: childSnapshot.val(),
            };

            retVal.push(buildObject);
        });

        console.log(JSON.stringify(retVal));
        return retVal;
    });
}

export async function updateAccountNumber(number) {
  db.ref('admin/accountNum').set(parseInt(number));
}


export async function addAccount(account) {
    let accountNums = await getNextAccountNumber();
    let accountId = 0;
    accountNums.forEach((item, index) => {
      if (item.key === "accountNum") {
        accountId = item.accountNum;
      }
    })
    let accountObj = {...account, accountId: accountId}
    db.ref('account/' + accountId).set(accountObj);
    updateAccountNumber(parseInt(accountId) + 1);
    return accountId;
}

export async function getAccount(accountId) {
  var retVal = '{ ';
  var itemsRef = db.ref('account/' + accountId);
  itemsRef.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
          retVal += '"' + childSnapshot.key + '":"' + childSnapshot.val() + '",';
      });
      retVal = retVal.substring(0, retVal.length - 1) + " }";
      return JSON.parse(retVal);
  });
}

/**
 * This will allow updating of a user record.
 * @param userName - The unique username of the user who you would like to update
 * @param fieldToUpdate - The name of the user attribute which you would like to change
 * @param value - The value you would like to set that attribute to
 */
export function updateUser(userName, fieldToUpdate, value) {
    let userRef = db.ref('users/' + userName + "/" + fieldToUpdate);
    userRef.set(value);
}

export function updateEntireUser(userName, userObj) {
    console.log(userObj);
    let itemRef = db.ref('users/' + userName);
    itemRef.set(userObj);
}

/**
 * Allows removing a user from the database by deactivating the user
 * @param {string} userName - The name of the item we need to update
 */
export function deactivateUser(userName) {
    updateUser(userName, 'active', false);
}

/**
 * Allows removing an item from the database by deleting the user
 * @param {string} userName - The name of the user we need to delete
 */
export function deleteUser(userName) {
    let userRef = db.ref('users/' + userName);
    userRef.remove()
}




// Item functions
/**
 * This will retrieve all items from the firebase database
 * @returns TODO - Either go with an array of JSON strongs (each index has one item's full info) or a map of items,
 * with the key being the name.
 */
export function getAllItems() {
    var usersRef = db.ref('items');
    usersRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.val().name;
            var cost = childSnapshot.val().cost;
            var itemCount = childSnapshot.val().itemCount;
            var price = childSnapshot.val().price;
            console.log("Item: " + name  + " | Cost: " + cost + " | Price: " + price + " | Item Count: " + itemCount);
        });
    });
}

export function getAllItemsArrayPromise() {
    return db.ref('items').once('value').then(function(snapshot) {
        var retVal = [];
        snapshot.forEach(function(childSnapshot) {
            var buildObject = {
                key: childSnapshot.key,
                name: childSnapshot.val().name,
                category: childSnapshot.val().category,
                barcode: childSnapshot.val().barcode,
                description: childSnapshot.val().description,
                itemCode: childSnapshot.val().itemCode,
                itemCount: childSnapshot.val().itemCount,
                minThreshold: childSnapshot.val().minThreshold,
                price: childSnapshot.val().price,
                user: childSnapshot.val().user,
                cost: childSnapshot.val().cost,
            };

            retVal.push(buildObject);
        });

        console.log(retVal);
        return retVal;
    });
}


export function getAllItemsNamesPromise() {
    return db.ref('items').once('value').then(function(snapshot) {
        console.log("SNAPSHOT: " + snapshot.val().name);
        var retVal = [];
        snapshot.forEach(function(childSnapshot) {
            retVal.push(childSnapshot.val().name);
        });
        return retVal;
    });
}

export function getAllItemsCategoriesPromise() {
    return db.ref('items').once('value').then(function(snapshot) {
        //console.log("SNAPSHOT: " + snapshot.val().category);
        var retVal = ["All Categories"];
        snapshot.forEach(function(childSnapshot) {
            retVal.push(childSnapshot.val().category);
        });
        var uniqueArray = retVal.filter( onlyUnique );
        return uniqueArray;
    });
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


/**
 * This is to retrieve a specific item's information by the name of the item.
 * @param itemCode - The name of the item you want to return
 * @returns An array of all of the attributes of the item, or error message if item not found.
 */
export function getSpecificItem(itemCode) {
    var retVal = '{ ';
    var itemsRef = db.ref('items/' + itemCode);
    itemsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            retVal += '"' + childSnapshot.key + '":"' + childSnapshot.val() + '",';
        });
        retVal = retVal.substring(0, retVal.length - 1) + " }";
        console.log(retVal);
        console.log(JSON.parse(retVal));
        return JSON.parse(retVal);
    });
}

export function getSpecificItemArrayPromise(itemCode) {
    return db.ref('items/' + itemCode).once('value').then(function(snapshot) {
        var retVal = [];
        snapshot.forEach(function(childSnapshot) {
            var buildObject = {
                key: childSnapshot.key,
                name: childSnapshot.val().name,
                category: childSnapshot.val().category,
                barcode: childSnapshot.val().barcode,
                description: childSnapshot.val().description,
                itemCode: childSnapshot.val().itemCode,
                itemCount: childSnapshot.val().itemCount,
                minThreshold: childSnapshot.val().minThreshold,
                price: childSnapshot.val().price,
                user: childSnapshot.val().user,
                cost: childSnapshot.val().cost,
            };

            retVal.push(buildObject);
        });

        console.log(retVal);
        return retVal;
    });
}




/**
 * Allows the updating of an item
 * @param {string} itemCode - The name of the item we need to update
 * @param fieldToUpdate - The name of the user attribute which you would like to change
 * @param value - The value you would like to set that attribute to
 */
export function updateItem(itemCode, fieldToUpdate, value) {
    let itemRef = db.ref('items/' + itemCode + "/" + fieldToUpdate);
    itemRef.set(value);
}

export function updateEntireItem(itemCode, itemObj) {
    let itemRef = db.ref('items/' + itemCode);
    itemRef.set(itemObj);
}


/**
 * Allows removing an item from the database by deactivating the item
 * @param {string} itemCode - The name of the item we need to update
 */
export function deactivateItem(itemCode) {
    updateItem(itemCode, 'active', false);

}

/**
 * Allows removing an item from the database by deleting the item
 * @param {string} itemCode - The name of the item we need to update
 */
export function deleteItem(itemCode) {
    let itemRef = db.ref('items/' + itemCode);
    itemRef.remove()
}

/**
 * Add an item with all required information
 *
 */
export function addItem(itemCode, barcode, category, cost, description, itemCount, minThreshold, name, price, user) {
    db.ref('items/' + itemCode).set({
        itemCode: itemCode,
        barcode: barcode,
        category: category,
        cost: cost,
        description: description,
        itemCount: itemCount || 0,
        minThreshold: minThreshold,
        name: name,
        price: price,
        user: user,
        active : true

    });
}
export function addItemfromApp(itemCode, category, description, itemCount, minThreshold, name, price) {
    db.ref('items/' + itemCode).set({
        itemCode: itemCode,
        category: category,
        description: description,
        itemCount: itemCount,
        minThreshold: minThreshold,
        name: name,
        price: price,
        active : true

    });
}

export function addItemSimple(itemCode, name) {
    db.ref('items/' + itemCode).set({
        name: name,
        active : true

    });
}

export function alertButton(btn) {
    alert('You pushed the ' + btn + ' button!');
}


/**
 * Hash / Encrypt password before sending it over the internet
 * @param {string} password - The users entered password from the form
 */
export function encryptPassword(password) {

}

/**
 * Decrypt password receieved
 * TODO - Not exactrly sure I need to do this. This is just apl aceholder for now, until I decide on how to handle the
 * passwords. I think this is probably a bad idea, honestly.
 * @param {string} password - The encrypted password from firebase
 */
export function decryptPassword(password) {

}


function cleanJSON(s) {
    // preserve newlines, etc - use valid JSON
    s = s.toString().replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
// remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g,"");
    return s;
}

/* Random tests -------------------------------------------------------------------------------------------------------
|                  THESE CAN BE DELETED OR LEFT, CURRENTLY JUST USING FOR SOME CONSOLE TESTING                        |
|                                                                                                                     |
|--------------------------------------------------------------------------------------------------------------------*/
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
/* End Random tests --------------------------------------------------------------------------------------------------
|                                                                                                                     |
|                                                                                                                     |
|--------------------------------------------------------------------------------------------------------------------*/
