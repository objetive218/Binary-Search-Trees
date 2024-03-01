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
  function levelOrder(callback) {}
  function inOrder(callback) {}
  function preOrder(callback) {}
  function postOrder(callback) {}
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
