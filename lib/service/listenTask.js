module.exports = (api, service) => callbacks => api
  .listenTask({ service })
  .on('data', ({ executionID, taskKey, inputData }) => {
    const { output, data } = callbacks[taskKey](JSON.parse(inputData))
    api.SubmitResult({
      executionID,
      outputKey: output,
      outputData: data
    }, console.log)
  })
