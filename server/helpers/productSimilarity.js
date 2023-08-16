function calculateSimilarity(productA, productB) {
  const categorySimilarity =
    productA.category._id === productB.category._id ? 1 : 0;

  const genderSimilarity = productA.gender._id === productB.gender._id ? 1 : 0;

  const descriptionSimilarity = calculateDescriptionSimilarity(
    productA.description,
    productB.description
  );
  const priceSimilarity =
    1 / (1 + Math.abs(productA.actual_price - productB.actual_price));

  const similarity =
    categorySimilarity * 0.8 +
    genderSimilarity * 0.6 +
    descriptionSimilarity * 0.2 +
    priceSimilarity * 0.4;

  return similarity;
}

function calculateDescriptionSimilarity(descriptionA, descriptionB) {
  // Will updated to actual similarity
  return Math.random();
}

module.exports = calculateSimilarity;
