class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        let sortedArray = [... new Set(array)].sort((a, b) => a - b);
        this.root = null;
        this.buildTree(sortedArray)
    }

    buildTree(array) {
        if (array.length < 1) {
            return null;
        }
        let mid = Math.floor(array.length / 2)
        let node = new Node(array[mid]);
        if (this.root == null) {
            this.root = node;
        }
        node.left = this.buildTree(array.slice(0, mid))
        node.right = this.buildTree(array.slice(mid + 1));
        return node;
    }

    insert(value, root = this.root) {
        if (root == null) {
            let newNode = new Node(value);
            root = newNode;
            return root;
        }
        if (value < root.data) {
            root.left = this.insert(value, root.left);
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    delete(value, root = this.root) {
        if (root == null) return root;
        if (root.data === value) {
            if (root.left == null && root.right == null) return null
            if (root.left == null) return root.right;
            if (root.right == null) return root.left

            let temp = root.right;
            while (temp.left) {
                temp = temp.left;
            }
            root.data = temp.data;
            root.right = this.delete(temp.data, root.right);
        }
        if (value < root.data) root.left = this.delete(value, root.left);
        else if (value > root.data) root.right = this.delete(value, root.right);
        return root
    }

    find(value, root = this.root) {
        if (root == null) return;
        if (root.data == value) return root;
        if (value < root.data) return this.find(value, root.left);
        if (value > root.data) return this.find(value, root.right);
    }

    levelOrder(func, root = this.root) {
        if (root == null) return []
        let queue = [root]
        let array = []
        while (queue.length) {
            let current = queue.shift();
            array.push(current.data)
            if (func != undefined) {
                func(current)
            }
            if (current.left) queue.push(current.left)
            if (current.right) queue.push(current.right)
        }
        return array;
    }

    preOrder(func, root = this.root) {
        if (root == null) return []
        if (func != undefined) func(root)
        let left = this.preOrder(func, root.left)
        let right = this.preOrder(func,root.right)
        return [root.data, ...left, ...right]
    }

    postOrder(func, root = this.root) {
        if (root == null) return []
        if (func != undefined) func(root)
        let left = this.postOrder(func, root.left)
        let right = this.postOrder(func, root.right)
        return [...left, ...right, root.data]
    }

    inOrder(func, root = this.root) {
        if (root === null) return []
        let left = this.inOrder(func, root.left)
        let right = this.inOrder(func, root.right)
        if (func!== undefined) func(root)
        return [...left, root.data, ...right]
    }


    height(node) {
        let root = this.find(node)
        return this.heightRec(root)
    }

    heightRec(node, num = 0) {
        if (node == null) return 0;
        if (node.right == null && node.left == null) return num;
        if (node.right && node.left) {
            return Math.max(this.heightRec(node.right, num + 1), this.heightRec(node.left, num + 1))
        } else if (node.right != null) {
            return this.heightRec(node.right, num + 1)
        } else {
            return this.heightRec(node.left, num + 1)
        }
    }

    depth(node) {
        let root = this.find(node)
        return this.depthHandler(root)
    }

    depthHandler(node, root = this.root, num = 0) {
        if (root == null) return 0;
        if (node == root) return num;
        if (root.right && root.left) {
            return Math.max(this.depthHandler(node, root.right, num + 1), this.depthHandler(node, root.left, num + 1))
        } else if (root.right != null) {
            return this.depthHandler(node, root.right, num + 1)
        } else {
            return this.depthHandler(node, root.left, num + 1)
        }
    }

    isBalanced(root = this.root) {
        if (root == null) return;
        let left = this.heightRec(root.left)
        let right = this.heightRec(root.right)
        this.isBalanced(root.right)
        this.isBalanced(root.left)
        if (Math.abs(left - right) <= 1) {
            return true;
        }
        return false
    }

    reBalance(){
        let array = this.inOrder()
        this.root=this.buildTree(array)
    }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}


const print = (value) => {
    console.log(value)
}


const randomArray=(num)=>{
    let array=[]
    for (let i=1; i<=num; i++){
        let randNum= Math.floor(Math.random()*500);
        array.push(randNum)
    }
    return array;
}
function insertRandomNumber(num){
    for (let i=1; i<=num; i++){
        let randNum= Math.floor(Math.random()*1000);
        tree.insert(randNum)
    }
}
let tree = new Tree(randomArray(5));
prettyPrint(tree.root)
console.log('is the tree is balanced',tree.isBalanced())
console.log('in order',tree.inOrder())
console.log('pre order',tree.preOrder())
console.log('post order',tree.postOrder());
console.log('level order',tree.levelOrder())

// add some number
console.log("________inserting random numbers_______")
insertRandomNumber(21);
console.log('in order',tree.inOrder())
console.log('pre order',tree.preOrder())
console.log('post order',tree.postOrder());
console.log('level order',tree.levelOrder())
prettyPrint(tree.root)
console.log('is the tree is balanced',tree.isBalanced())
tree.reBalance()
console.log('is the tree is balanced',tree.isBalanced())
prettyPrint(tree.root)