// Construct a trie data structure
class TrieNode {
    constructor() {
        this.children = new Map();
        this.flag = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the trie
    insert(word) {
        let root = this.root;
        for (const char of word) {
            if (!root.children.has(char)) {
                root.children.set(char, new TrieNode());
            }
            root = root.children.get(char);
        }
        root.flag = true;
    }

    // Search for words with a given prefix
    search(prefix) {
        let root = this.root;
        for (const char of prefix) {
            if (!root.children.has(char)) {
                return [];
            }
            root = root.children.get(char);
        }
        return this._getAllWords(root, prefix);
    }

    // Helper function to get all words under a given node
    _getAllWords(root, prefix) {
        let words = [];
        if (root.flag) {
            words.push(prefix);
        }
        for (const [char, childNode] of root.children) {
            words = words.concat(this._getAllWords(childNode, prefix + char));
        }
        return words;
    }

    // Method to print all nodes
    printAllNodes() {
        const results = [];
        this._dfs(this.root, '', results);
        console.log(results);
    }

    _dfs(root, prefix, results) {
        if (root.flag) {
            results.push(prefix);
        }
        for (let [char, childNode] of root.children) {
            this._dfs(childNode, prefix + char, results);
        }
    }
}

export {Trie, TrieNode}