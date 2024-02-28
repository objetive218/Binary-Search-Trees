import node from "./node";

export default function tree(arr) {
  arr.sort((a, b) => a - b);
  let orderArr = arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  function buildTree(orderArr) {
    let end = orderArr.length - 1;
    if (0 > end) return null;
    let mid = parseInt((start + end) / 2);
    let node = node(
      orderArr[mid],
      buildTree(orderArr.splice(0, mid)),
      buildTree(orderArr.splice(mid + 1))
    );

    return node;
  }

  function insert(value) {}
  function deleteItem(value) {}
  function find(value) {}
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
