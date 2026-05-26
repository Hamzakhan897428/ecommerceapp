import { createSlice } from '@reduxjs/toolkit'

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: localStorage.getItem('card') ? JSON.parse(localStorage.getItem('card')) : []
  },
  reducers: {
    addCard: (state, action) => {
      state.cards.push(action.payload.cardItem)
      localStorage.setItem('card', JSON.stringify(state.cards))
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter(card => card.id !== action.payload.cardItem.id)
      localStorage.setItem('card', JSON.stringify(state.cards))
    },
    changeQuantity: (state, action) => {
      const { cardItem } = action.payload || {};
      if (!cardItem || typeof cardItem.id === 'undefined') return;

      const { id, delta, quantity } = cardItem;
      state.cards = state.cards.map((c) => {
        if (c.id !== id) return c;

        const newQuantity = typeof quantity === 'number'
          ? Math.max(1, quantity)
          : Math.max(1, (c.quantity || 1) + (delta || 0));

        return {
          ...c,
          quantity: newQuantity,
          total: (c.price || 0) * newQuantity,
        };
      });

      localStorage.setItem('card', JSON.stringify(state.cards));
    }
  }
})

export const { addCard, removeCard, changeQuantity } = cardSlice.actions
export default cardSlice.reducer
