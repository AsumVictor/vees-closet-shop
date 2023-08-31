function checkVariantEmpty(variation) {
  const emptyKeys = [];
  for (const key in variation) {
    if (variation[key] === "") {
      emptyKeys.push(key);
    }
  }
  if (emptyKeys.length === 0) {
    return {
      isEmptyKeys: false,
    };
  }
  return {
    isEmptyKeys: true,
    keys: emptyKeys,
  };
}

export default checkVariantEmpty;
console.log(checkVariantEmpty({x: '', y: ""}));