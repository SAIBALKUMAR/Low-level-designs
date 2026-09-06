

class TreeNode {
    constructor(value) {
        this.endOfWord = false;
        this.children = [];
        this.value = value
    }
}

class Autosuggest {
    constructor() {
        this.root = new TreeNode(null);
    }

    insert(word) {
        let currentNode = this.root;
        for (const char of word) {
            let childNode = currentNode.children.find(child => child.value === char);
            if (!childNode) {
                childNode = new TreeNode(char);
                currentNode.children.push(childNode);
            }
            currentNode = childNode;
        }
        currentNode.endOfWord = true;
    }

    search(prefix) {
        let currentNode = this.root;
        for (const char of prefix) {
            const childNode = currentNode.children.find(child => child.value === char); 
            if (!childNode) {
                return [];
            }
            currentNode = childNode;
        }
        return this._collectWords(currentNode, prefix);
    }

    _collectWords(node, prefix) {
        const words = [];
        if (node.endOfWord) {
            words.push(prefix);
        }
        for (const child of node.children) {
            words.push(...this._collectWords(child, prefix + child.value));
        }
        return words;
    }
}