const hasEmptyValues = (values, isNew, hasVariation) => {
  if (isNew) {
    let variations = [];
    if (!hasVariation) {
      return {
        isValid: true,
      };
    }

    if (values.length < 1) {
      return {
        isValid: false,
      };
    }

    
    for (const variation of values) {
          if (variation.selected_values.length === 0) {
            return {
                isValid: false,
            } 
        
        }
        
          variations.push({
            variation: variation.variation._id,
            selected_values: variation.selected_values,
          })
      }

    return {
      isValid: true,
      variations,
    };
  }

  if (values.length > 0) {
    values.forEach((value) => {
      if (value.selected_values.length < 1) {
        return {
          isValid: false,
        };
      }
    });

    return {
      isValid: true,
    };
  }

  return {
    isValid: true,
  };
};

export default hasEmptyValues;
