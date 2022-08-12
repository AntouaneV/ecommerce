import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(
          `vous avez augmenté la quantité de ${state.cartItems[itemIndex].name} dans votre panier.`,
          {
            position: 'bottom-right',
          }
        );
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        toast.info(
          `Vous avez ajouté ${action.payload.name} dans votre panier.`,
          {
            position: 'bottom-right',
          }
        );
      }
    },
    removeFromCart: (state, action) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );

      state.cartItems = nextCartItems;
      toast.error(
        `vous avez supprimé ${action.payload.name} de votre panier.`,
        {
          position: 'bottom-right',
        }
      );
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.info(
          `vous avez diminué la quantité de ${action.payload.name} dans votre panier.`,
          {
            position: 'bottom-right',
          }
        );
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem._id !== action.payload._id
        );

        state.cartItems = nextCartItems;
        toast.error(
          `vous avez supprimé ${action.payload.name} de votre panier.`,
          {
            position: 'bottom-right',
          }
        );
      }
    },
    clearCart: (state, payload) => {
      state.cartItems = [];
      toast.error(`Votre panier a été supprimer.`, {
        position: 'bottom-right',
      });
    },
    getTotals: (state, payload) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
