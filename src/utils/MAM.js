import Mam from 'mam.client.js';
import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import { provider } from '../config.json';

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
                eventBody.status = 'updated'

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
            const blueprint = {};
            blueprint.type = "blueprint";
            blueprint.data = product;
            blueprint.timestamp = Date.now();
            blueprint.status = 'created'


            // create stock
            let stock_seed = generateSeed()
            let stock_state_object = Mam.init(provider, stock_seed, 2)
            stock_state_object = Mam.changeMode(stock_state_object, 'restricted', 'TEST')

            const stock = {};
            stock.type = "stock";
            stock.data = [];
            stock.timestamp = blueprint.timestamp;
            stock.status = 'created'
            stock.blueprint = Mam.getRoot(state_object)

            const mam_stock = await publish(stock, stock_state_object);

            if (mam_stock) {
                // create product
                // add stock root to data object
                blueprint.stock_root = mam_stock.root;

                const mam_blueprint = await publish(blueprint, state_object);


                if (mam_blueprint) {
                    blueprint.root = mam_blueprint.root;
                    blueprint.secretKey = mam_blueprint.state.channel.secretKey;
                    blueprint.next_root = mam_blueprint.state.channel.next_root;
                    blueprint.start = mam_blueprint.state.channel.start;

                }
                blueprint.stock_next_root = mam_stock.state.channel.next_root;
                blueprint.stock_seed = stock_seed
                blueprint.stock_start = mam_stock.state.channel.start;
            }

            return resolve(blueprint);
        } catch (error) {
            console.log('createProductChannel error', error);
            return reject();
        }
    });

    return promise;
};

export const increaseStock = (data, product) => {
    let seed = generateSeed()
    let resp = {};
    let state_object = Mam.init(provider, seed, 2)
    state_object = Mam.changeMode(state_object, 'restricted', 'TEST')

    const promise = new Promise(async (resolve, reject) => {
        try {

            console.log("product info", product)
            console.log("product data", data)

            // create real product
            const product_object = {};
            product_object.type = "product";
            product_object.data = data;
            product_object.timestamp = Date.now();
            product_object.status = 'created'
            product_object.blueprint = product.root
            product_object.stock = product.stock_root

            const mam_product = await publish(product_object, state_object);


            if (mam_product) {
                console.log("success", mam_product)

                // append stock channel with product information
                resp = await appendStock(mam_product.root, product.stock_root, product.stock_seed, product.stock_next_root, product.stock_start)
                console.log("stock attended: ", resp)
            }
            
            return resolve(resp);
        } catch (error) {
            console.log('increaseStock error', error);
            return reject();
        }
    });

    return promise;
};
export const appendStock = async (data, root, seed, next_root, start) => {

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
            if (root) {
                const eventBody = {};
                eventBody.data = data;
                eventBody.timestamp = Date.now();
                eventBody.status = 'increased'

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
            console.log('appendStock error', error);
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

export const fetch = (
    root,
    mode = 'public',
    key = null,
    reportEvent,
    onFetchComplete
) => {
    if (!provider || !root) return;
    const promise = new Promise(async (resolve, reject) => {
        try {
            Mam.init(provider);
            await Mam.fetch(root, mode, key, data => {
                const event = JSON.parse(trytesToAscii(data));
                reportEvent(event);
            });
            return resolve(onFetchComplete());
        } catch (error) {
            console.log('MAM fetch error', error);
            return reject();
        }
    });

    return promise;
};