export const initialState = {
  basket: [],
  user: null,
  products: []
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0)


const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item]
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);

      } else {
        console.warn(`Can't remove product (id: ${action.id}) as its not in basket!`)
      };

    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: []
      };

      return {
        ...state,
        basket: newBasket
      }
    case 'SET_USER':
      return{
        ...state,
        user: action.user
      }

    default:
      return state;

    case 'SET_PRODUCTS':
      return{
        ...state,
        products: action.products
      }

    case 'DELETE_PRODUCT':

      const products = state.products.filter(product => product.id !== action.id);
      return{
        ...state,
        products: products
      }

    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.products]
    };
  }
};

export default reducer;
