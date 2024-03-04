import node from "./node";

export default function tree(arr) {
  arr.sort((a, b) => a - b);
  let orderArr = arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  function buildTree(orderArr) {
    let end = orderArr.length;
    if (orderArr.length === 0) return null;
    let mid = parseInt(end / 2);
    let newNode = node(
      orderArr[mid],
      buildTree(orderArr.slice(0, mid)),
      buildTree(orderArr.slice(mid + 1))
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
      tree = insert(value, tree.left);
    } else if (tree.data > value) {
      tree = insert(value, tree.right);
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
  function height(node) {}
  function depth(node) {}
  function isBalanced() {}
  function rebalance() {}
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
