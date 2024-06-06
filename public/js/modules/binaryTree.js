class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        this.left = null;
        this.right = null;
    }
}

class Menu {
    constructor() {
        this.root = null;
    }

    // Insert a new menu item
    insert(name, price) {
        let newItem = new MenuItem(name, price);
        if (!this.root) {
            this.root = newItem;
            return;
        }
        this.insertNode(this.root, newItem);
    }

    insertNode(root, newItem) {
        if (newItem.name < root.name) {
            if (!root.left) {
                root.left = newItem;
            } else {
                this.insertNode(root.left, newItem);
            }
        } else {
            if (!root.right) {
                root.right = newItem;
            } else {
                this.insertNode(root.right, newItem);
            }
        }
    }

    // Search for a menu item by name
    search(name) {
        return this.searchNode(this.root, name);
    }

    searchNode(node, name) {
        if (!node) return null;
        if (name === node.name) return node;
        if (name < node.name) return this.searchNode(node.left, name);
        return this.searchNode(node.right, name);
    }

    // In-order traversal to display menu items
    inOrder(root, result = []) {
        if (root) {
            this.inOrder(root.left, result);
            result.push(root);
            this.inOrder(root.right, result);
        }
        return result;
    }

    logMenu() {
        const items = this.inOrder(this.root);
        items.forEach(item => {
            console.log(`${item.name}: $${item.price}`);
        });
    }
}

export {Menu, MenuItem}