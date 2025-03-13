const { Kafka } = require('kafkajs')
const fetch = require('fetch').fetchUrl

const kafka = new Kafka({
  clientId: '1',
//   brokers: ['broker:29092', 'broker:9092']
 brokers: async () => {
    // Example getting brokers from Confluent REST Proxy
    const clusterResponse = await fetch('http://0.0.0.0:8081/v3/clusters', {
      headers: 'application/vnd.api+json',
    }).then(response => response.json())
    const clusterUrl = clusterResponse.data[0].links.self

    const brokersResponse = await fetch(`${clusterUrl}/brokers`, {
      headers: 'application/vnd.api+json',
    }).then(response => response.json())

    const brokers = brokersResponse.data.map(broker => {
      const { host, port } = broker.attributes
      return `${host}:${port}`
    })

    return brokers
  }
})

// const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'connect-cluster-group' })

const run = async () => {
  // Producing
//   await producer.connect()
//   await producer.send({
//     topic: 'test-topic',
//     messages: [
//       { value: 'Hello KafkaJS user!' },
//     ],
//   })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'ChangeStreamDemo.ChangeStreamColl', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

run().catch(console.error)