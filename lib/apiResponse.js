module.exports = (resolve, reject) => (err, res) => err
  ? reject(err)
  : resolve(res)
