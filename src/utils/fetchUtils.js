import 'regenerator-runtime'

/**
 * Get functions list from aws lambda, and add to state
 * @param {function} setFunctionData - useState hook setter function for functionData state
 * @returns {undefined}
 */
export const getFuncs = async (setFunctionData) => {
  try {
    const data = await fetch('/api/aws/getFunctionNames');
    const parsedData = await data.json();
    setFunctionData(parsedData.map(func => { 
      return {
      ...func,
      metrics: null,
      logs: null
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}