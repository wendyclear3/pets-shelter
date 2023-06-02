import { IPetStoreAction } from './types'

const initialState = {
    currentPage: 1,
    totalPage: null,
    pets: [],
    dataPerPage: 10
}

const petsReducer = (state = initialState, action: IPetStoreAction) => {
    switch (action.type) {
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'FETCH_DATA':
            return {
                ...state,
                pets: action.payload.pets,
                totalPage: action.payload.totalPage
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state
    }
}

export default petsReducer