export default function node(
  data = null,
  rightChildren = null,
  leftChildren = null
) {
  return {
    data: data,
    rightChildren: rightChildren,
    leftChildren: leftChildren,
  };
}
