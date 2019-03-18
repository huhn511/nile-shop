import Mam from 'mam.client.js';
import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import { provider } from '../config.json';

// Initialise MAM State

// Publish to tangle
const publish = async (data, mamState) => {


    try {

        // Create MAM Payload - STRING OF TRYTES
        const trytes = asciiToTrytes(JSON.stringify(data));
        const message = Mam.create(mamState, trytes);
        
        // Attach the payload.
        await Mam.attach(message.payload, message.address, 3, 14);
        return { root: message.root, state: message.state };
    } catch (error) {
        return null;
    }
};

export const appendAttributesUpdate = async (product, seed, next_root, start) => {

    const mamState = {
        subscribed: [],
        channel: {
            side_key: "TEST",
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    };

    const promise = new Promise(async (resolve, reject) => {
        try {
            if (product) {
                const eventBody = {};
                eventBody.data = product;
                eventBody.timestamp = Date.now();
                eventBody.status = 'product_updated'

                const messageBody = {
                    ...eventBody
                };



                const mamData = await publish(eventBody, mamState);

                if (mamData) {
                    // Create a new item entry using that item ID
                    //await createItem(eventBody, channel, secretKey);
                    eventBody.root = mamData.root;
                    eventBody.secretKey = mamData.state.channel.secretKey;
                    eventBody.next_root = mamData.state.channel.next_root;
                    eventBody.start = mamData.state.channel.start;

                }

                return resolve(eventBody);

            }
            return reject();
        } catch (error) {
            return reject();
        }
    });

    return promise;
};


const appendToChannel = async (product, seed, next_root, start) => {    

    const mamState = {
        subscribed: [],
        channel: {
            side_key: "TEST",
            mode: 'restricted',
            next_root: next_root,
            security: 2,
            start: start,
            count: 1,
            next_count: 1,
            index: 0,
        },
        seed: seed,
    };
    try {

        const eventBody = {};
        eventBody.data = product;
        eventBody.timestamp = Date.now();
        eventBody.status = 'updated'

        const messageBody = {
            ...eventBody
        };



        const mamData = await publish(product, mamState);

        if (mamData) {
            // Create a new item entry using that item ID
            //await createItem(eventBody, channel, secretKey);
            eventBody.root = mamData.root;
            eventBody.secretKey = mamData.state.channel.secretKey;
            eventBody.next_root = mamData.state.channel.next_root;
            eventBody.start = mamData.state.channel.start;

        }

        return eventBody;
    } catch (error) {
        console.log('MAM append error', error);
        return null;
    }
};

export const fetchProduct = async (seed, root, secretKey) => {

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    secretKey = 'TEST'
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)
        return itemEvents[itemEvents.length - 1];
    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};


export const createProductChannel = (product, seed) => {
    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    const promise = new Promise(async (resolve, reject) => {
        try {
            const secretKey = 'TEST'//generateSeed(81);
            const eventBody = {};
            eventBody.data = product;
            eventBody.timestamp = Date.now();
            eventBody.status = 'created'

            const messageBody = {
                ...eventBody
            };

            
            const mam_object = await publish(eventBody, state_object);


            if (mam_object) {
                // Create a new item entry using that item ID
                //await createItem(eventBody, channel, secretKey);
                eventBody.root = mam_object.root;
                eventBody.secretKey = mam_object.state.channel.secretKey;
                eventBody.next_root = mam_object.state.channel.next_root;
                eventBody.start = mam_object.state.channel.start;

            }

            return resolve(eventBody);
        } catch (error) {
            console.log('createProductChannel error', error);
            return reject();
        }
    });

    return promise;
};

export const fetchProducts = async (seed, root, secretKey) => {

    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    secretKey = 'TEST'
    try {
        const itemEvents = [];
        const convertData = data => {
            const itemEvent = JSON.parse(trytesToAscii(data));
            itemEvents.push(itemEvent);
        }

        await Mam.fetch(root, 'restricted', secretKey, convertData)

        return itemEvents;

    } catch (e) {
        console.error("fetchItem:", "\n", e);
        return e;
    }
};

export const generateSeed = () => {
    if (window.crypto && window.crypto.getRandomValues) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
        let result = '';
        let values = new Uint32Array(81);
        window.crypto.getRandomValues(values);
        values.forEach(value => (result += charset[value % charset.length]));
        return result;
    } else throw new Error('Your browser is outdated and cant generate secure random numbers');
};