/**
 * Recursevly reduce selectionSet
 * @param {Array} selections
 * @param {Object} initial
 * @return {Project}
 */
function reducer(selections, initial) {
  return selections.reduce((projs, selection) => {
    switch (selection.kind) {
      case 'Field':
        return {
          ...projs,
          [selection.name.value]: 1,
        };
      case 'InlineFragment':
        return {
          ...projs,
          ...reducer(selection.selectionSet.selections, {}),
        };
      default:
        throw 'Unsupported query';
    }
  }, initial);
}

/**
 * Generate projection object for mongoose
 * TODO: Handle sub-documents
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection(fieldASTs) {
  const { selections } = fieldASTs.selectionSet;
  return reducer(selections);
}
