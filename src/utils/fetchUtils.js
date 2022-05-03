import 'regenerator-runtime'

export const getFuncs = async (setFunctionData) => {
  try {
    const data = await fetch('/api/aws/getFunctionNames');
    const parsedData = await data.json();
    setFunctionData(parsedData);
    return parsedData;
  } catch (err) {
    console.log(err);
  }
}