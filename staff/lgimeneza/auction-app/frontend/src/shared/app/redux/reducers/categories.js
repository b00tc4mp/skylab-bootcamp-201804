'use strict'

import { Types } from '../constants';

const initialState = {
    categories:[]
};
export default function products(state = initialState, action) {
    switch (action.type) {
        case Types.UPDATE_CATEGORIES:
            return action.categories
        default:
            return state;
    }
}