import node from "./node";

export default function tree(arr) {
  arr.sort((a, b) => a - b);
  let orderArr = arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
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
      tree.left = insert(value, tree.left);
    } else if (tree.data > value) {
      tree.right = insert(value, tree.right);
    }
    return tree;
  }
  function deleteItem(value, nodo = newNode) {
    if (nodo === null) return nodo;
    if (value > nodo.data) {
      deleteItem(value, nodo.right);
    } else if (value < nodo.data) {
      deleteItem(value, nodo.left);
    } else {
      if (nodo.left === null) return nodo.right;
      if (nodo.right === null) return nodo.left;

      nodo.data = minDataValue(nodo.right);
      nodo.right = deleteItem(nodo.data, nodo.right);
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
    if (tree === null) return [];
    callback(tree);
    preOrderArr.push(tree.data);
    if (tree.left) levelOrder(callback, tree.left, preOrderArr);
    if (tree.right) levelOrder(callback, tree.right, preOrderArr);
    return preOrderArr;
  }
  function inOrder(callback, tree = newNode, inOrderArr = []) {
    if (tree === null) return null;
    inOrder(callback, tree.left, inOrderArr);
    callback(tree);
    inOrderArr.push(tree.data);
    inOrder(callback, tree.right, inOrderArr);
    return inOrderArr;
  }
  function postOrder(callback, tree = newNode, postOrderArr = []) {
    if (tree === null) return null;
    inOrder(callback, tree.left, postOrderArr);
    inOrder(callback, tree.right, postOrderArr);
    callback(tree);
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
    let lh = height(tree.left);
    let rh = height(tree.right);
    if (
      Math.abs(lh - rh) <= 1 &&
      isBalanced(tree.left) &&
      isBalanced(tree.right)
    )
      return true;
    return false;
  }

  function rebalance() {
    let orderArr = inOrder(null, newNode);
    let rebalanceTree = buildTree(orderArr);
    return rebalanceTree;
  }
  return {
    insert,
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
