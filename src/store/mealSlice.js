import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     meals: [],
     items: [],
     totalAmount: 0,
};

const mealSlice = createSlice({
     name: 'meals',
     initialState: initialState,
     reducers: {
          addItem(state, { payload: item }) {
               const newTotalAmount = state.totalAmount + item.price * item.amount;
               const existCartItemIndex = state.items.findIndex(i => i.id === item.id);
               const existCartItem = state.items[existCartItemIndex];
               let updateItems;
               if (existCartItem) {
                    const updateItem = {
                         ...existCartItem,
                         amount: existCartItem.amount + item.amount,
                    };
                    updateItems = [...state.items];
                    updateItems[existCartItemIndex] = updateItem;
               } else {
                    updateItems = state.items.concat(item);
               }
               state.items = updateItems;
               state.totalAmount = newTotalAmount;
          },
          deleteItem(state, { payload: id }) {
               const existCartItemIndex = state.items.findIndex(item => item.id === id);
               const existCartItem = state.items[existCartItemIndex];
               const updatedTotalAmount = state.totalAmount - existCartItem.price;
               let updateItems;
               if (existCartItem.amount === 1) {
                    updateItems = state.items.filter(item => item.id !== id);
               } else {
                    const updateItem = { ...existCartItem, amount: existCartItem.amount - 1 };
                    updateItems = [...state.items];
                    updateItems[existCartItemIndex] = updateItem;
               }
               state.items = updateItems;
               state.totalAmount = updatedTotalAmount;
          },
          clearCart() {},
     },
});

export const { addItem, clearCart, deleteItem } = mealSlice.actions;
export default mealSlice.reducer;
