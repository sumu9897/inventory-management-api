const inventory = require("../data/inventoryData");


let nextId = inventory.length + 1;

class ItemModel {
  static getAll() {
    return inventory;
  }

  static getById(id) {
    return inventory.find((item) => item.id === id);
  }

  static create(itemData) {
    const newItem = {
      id: nextId++,
      ...itemData
    };

    inventory.push(newItem);
    return newItem;
  }

  static update(id, updatedData) {
    const itemIndex = inventory.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return null;
    }

    inventory[itemIndex] = {
      id,
      ...updatedData
    };

    return inventory[itemIndex];
  }

  static delete(id) {
    const itemIndex = inventory.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return null;
    }

    const deletedItem = inventory[itemIndex];
    inventory.splice(itemIndex, 1);

    return deletedItem;
  }
}

module.exports = ItemModel;