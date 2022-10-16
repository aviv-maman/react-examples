import { cartActions } from './cartSlice';
import { uiActions } from './uiSlice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-http-c4abb-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      if (!response.ok) {
        throw new Error('Fetching cart data failed.');
      }

      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      const cartDataOrEmptyArray = { ...cartData, items: cartData.items || [] };

      dispatch(cartActions.replaceCart(cartDataOrEmptyArray));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failure',
          message: 'Fetching of cart data failed.',
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending Data...',
        message: 'Sending cart data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-http-c4abb-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Succeeded.',
          message: 'Cart data successfully sent.',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Failure',
          message: 'Sending of cart data failed.',
        })
      );
    }
  };
};
