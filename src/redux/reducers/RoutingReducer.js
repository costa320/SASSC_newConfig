const Routing = (state = {
    'match': {}
}, action) => {

    switch (action.type) {
        case "SET_ROUTING":
            /* give me all the properties of state  => ...state */
            state = {
                ...state,
                /* viene fatto l'ovverride delle proprieta dello stesso nome, in questo caso sono due*/
                match: action.payload
            };
            break;
    }
    return state;
};

export default Routing;