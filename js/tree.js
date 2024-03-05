function node(data = null, left = null, right = null) {
  return {
    data: data,
    left: left,
    right: right,
  };
}

function tree(arr) {
  function sortArr(arr) {
    arr.sort((a, b) => a - b);
    return arr.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }
  function buildTree(arr) {
    const newOrderArr = sortArr(arr);
    let end = newOrderArr.length;
    if (newOrderArr.length === 0) return null;
    let mid = parseInt(end / 2);
    let newNode = node(
      newOrderArr[mid],
      buildTree(newOrderArr.slice(0, mid)),
      buildTree(newOrderArr.slice(mid + 1))
    );

    return newNode;
  }
  let newNode = buildTree(arr);

  function minDataValue(nodo) {
    let minV = nodo.date;
    while (nodo.left !== null) {
      minV = nodo.left.data;
      nodo = nodo.left;
    }
    return minV;
  }

  function insert(value, tree = newNode) {
    if (tree === null) {
      return node(value);
    } else if (tree.data < value) {
      tree.right = insert(value, tree.right);
    } else if (tree.data > value) {
      tree.left = insert(value, tree.left);
    }
    return tree;
  }
  function deleteItem(value, nodo = newNode) {
    if (nodo === null) return nodo;
    if (nodo.data < value) {
      nodo.right = deleteItem(value, nodo.right);
    } else if (nodo.data > value) {
      nodo.left = deleteItem(value, nodo.left);
    } else {
      if (nodo.left === null) return nodo.right;
      else if (nodo.right === null) return nodo.left;

      nodo.data = minDataValue(nodo.right);
      nodo.right = deleteItem(value, nodo.right);
    }
    return nodo;
  }

  function find(value, tree = newNode) {
    if (value === tree?.data) {
      return tree;
    } else if (value < tree?.data) {
      return (tree = find(value, tree.left));
    } else if (value > tree?.data) {
      return (tree = find(value, tree.right));
    }
  }
  function levelOrder(callback, tree = newNode) {
    let queue = [tree];
    let result = [tree.data];
    while (queue.length > 0) {
      let node = queue.shift();
      callback ? callback(node) : "";
      if (node.left) {
        queue.push(node.left);
        result.push(node.left.data);
      }
      if (node.right) {
        queue.push(node.right);
        result.push(node.right.data);
      }
    }
    return result;
  }
  function preOrder(callback, tree = newNode, preOrderArr = []) {
    if (tree === null) return;
    callback ? callback(tree) : "";
    preOrderArr.push(tree.data);
    if (tree.left) preOrder(callback, tree.left, preOrderArr);
    if (tree.right) preOrder(callback, tree.right, preOrderArr);
    return preOrderArr;
  }
  function inOrder(callback, tree = newNode, inOrderArr = []) {
    if (tree === null) return [];
    if (tree.left !== null) inOrder(callback, tree.left, inOrderArr);
    callback ? callback(tree) : "";
    inOrderArr.push(tree.data);
    if (tree.right !== null) inOrder(callback, tree.right, inOrderArr);
    return inOrderArr;
  }
  function postOrder(callback, tree = newNode, postOrderArr = []) {
    if (tree === null) return;
    postOrder(callback, tree.left, postOrderArr);
    postOrder(callback, tree.right, postOrderArr);
    callback ? callback(tree) : "";
    postOrderArr.push(tree.data);
    return postOrderArr;
  }
  function height(node, tree = newNode) {
    if (node === null) return -1;
    let left = node ? height(node.left) : height(tree.left);
    let right = node ? height(node.right) : height(tree.right);
    return Math.max(left, right) + 1;
  }
  function depth(node, tree = newNode) {
    if (tree === null) return -1;
    let count = -1;
    if (
      tree?.data === node?.data ||
      (count = depth(node, tree?.left)) >= 0 ||
      (count = depth(node, tree?.right)) >= 0
    )
      return count + 1;
    return count;
  }
  function isBalanced(tree = newNode) {
    if (tree === null) return true;
    let leftH = height(tree.left);
    let rightH = height(tree.right);
    if (
      Math.abs(leftH - rightH) <= 1 &&
      isBalanced(tree.left) &&
      isBalanced(tree.right)
    )
      return true;
    return false;
  }

  function rebalance() {
    let orderArr = inOrder(null, newNode);
    const rebalanceTree = buildTree(orderArr);
    return (newNode = rebalanceTree);
  }
  return {
    insert,
    newNode,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
const prettyPrint = (treeNode, prefix = "", isLeft = true) => {
  if (treeNode === null) {
    return;
  }
  if (treeNode?.right !== null) {
    prettyPrint(treeNode?.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${treeNode.data}`);
  if (treeNode?.left !== null) {
    prettyPrint(treeNode?.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let newFactoryTree = tree([1, 3, 2, 4]);
console.log(newFactoryTree.levelOrder());
console.log(newFactoryTree.isBalanced());
newFactoryTree.insert(8);
newFactoryTree.insert(12);
newFactoryTree.insert(5);
newFactoryTree.insert(9);
newFactoryTree.deleteItem(9);
prettyPrint(newFactoryTree.newNode);
console.log(newFactoryTree.find(9));
console.log(newFactoryTree.height());
console.log(newFactoryTree.height(newFactoryTree.find(3)));
console.log(newFactoryTree.depth(newFactoryTree.find(8)));
console.log(newFactoryTree.levelOrder());
console.log(newFactoryTree.preOrder());
console.log(newFactoryTree.inOrder());
console.log(newFactoryTree.postOrder());
console.log(newFactoryTree.isBalanced());
newFactoryTree.rebalance();
console.log(newFactoryTree.isBalanced());
prettyPrint(newFactoryTree.newNode);
