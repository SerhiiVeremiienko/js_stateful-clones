'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateStep = { ...state };
  const updatedStates = [];

  actions.forEach(({ type, extraData = {}, keysToRemove = [] }) => {
    if (['addProperties', 'removeProperties', 'clear'].includes(type)) {
      if (type === 'addProperties') {
        stateStep = { ...stateStep, ...extraData };
      } else if (type === 'removeProperties') {
        keysToRemove.forEach((key) => {
          delete stateStep[key];
        });
      } else if (type === 'clear') {
        stateStep = {};
      }

      updatedStates.push({ ...stateStep });
    }
  });

  return updatedStates;
}

module.exports = transformStateWithClones;
