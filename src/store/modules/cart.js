const cart = {
    state: {
        items: []
    },
    mutations: {
        ADD_TO_CARD: (state, product) => {
            console.log("product in muttion", product)
            state.items.push(product)
            console.log("state.items", state.items)        },
        REMOVE_FROm_CARD: (state, id) => {
            // remove object with the fiven id
            
        }
    },
    actions: {
        AddToCart: ({ commit }, product) => {
            commit('ADD_TO_CARD', product)
        },
        RemoveFromCart: ({ commit }, id) => {
            commit('REMOVE_FROm_CARD', id)
        }
    }
}

export default cart
