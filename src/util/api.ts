const handleAPIResponse = (resolve, reject) => (err, res) => {
    err ? reject(err)
        : resolve(res);
}

export {
    handleAPIResponse
}