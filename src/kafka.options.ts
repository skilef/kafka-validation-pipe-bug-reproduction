import { Partitioners } from "kafkajs";

export const KAKFA_OPTIONS = {
    client: {
        clientId: 'hero',
        brokers: ['localhost:9092'],
    },
    consumer: {
        groupId: 'hero-consumer'
    },
    producer: { // this producer config is added to silence a warning of kafkajs v2.0.0
        createPartitioner: Partitioners.LegacyPartitioner,
    },
}