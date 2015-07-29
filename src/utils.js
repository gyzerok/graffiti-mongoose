/**
 * Recursevly reduce selectionSet
 * @param {Array} selections
 * @param {Object} initial
 * @return {Project}
 */
function reducer(selections, initial) {
  return selections.reduce((projs, selection) => {
    if (selection.kind === 'InlineFragment') {
      return {
        ...projs,
        ...reducer(selection.selectionSet.selections, {}),
      };
    }

    return {
      ...projs,
      [selection.name.value]: 1,
    };
  }, initial);
}

/**
 * Generate projection object for mongoose
 * TODO: Handle sub-documents
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjections(fieldASTs) {
  const { selections } = fieldASTs.selectionSet;
  return reducer(selections);
}
