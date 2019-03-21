const cart = {
    state: {
        items: []
    },
    mutations: {
        ADD_TO_CARD: (state, product) => {
            console.log("product in muttion", product)

            const locationInCart = state.items.findIndex(p => {
                return p.item.data.id === product.data.id
            })

            if (locationInCart === -1) {
                state.items.push({
                    item: product,
                    quantity: 1
                })
            } else {
                state.items[locationInCart].quantity++
            }

            console.log("state.items", state.items)        
        },
        REMOVE_FROm_CARD: (state, id) => {

            const locationInCart = state.items.findIndex(p => {
                return p.item.data.id === id
            })

            if (state.items[locationInCart].quantity <= 1) {
                state.items.splice(locationInCart, 1)
            } else {
                state.items[locationInCart].quantity--
            }

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
