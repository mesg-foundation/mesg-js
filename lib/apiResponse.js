module.exports = (resolve, reject) => (err, res) => err || res.err
  ? reject(err || res.err)
  : resolve(res)