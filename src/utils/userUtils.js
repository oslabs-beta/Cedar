import 'regenerator-runtime'


/**
 * Post a users signup information to db, allowing for login with username/password
 * @async
 * @function postSignup
 * @param {string} user - the user's unique created username
 * @param {string} pass - the user's created password
 * @param {string} arn - the inputted stack's arn
 * @param {string} region - the user's inputted account region
 * @returns {undefined}
 */
export const postSignup = async (user, pass, arn, region) => {
  try {
    const data = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: user,
        password: pass,
        arn: arn,
        region: region
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });   
  } catch (err) {
    console.log(err);
  }
}

export const postLogout = async (setLogin) => {
  try {
    const data = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setLogin(false);
  } catch (err) {
    console.log(err);
  }
}