import { ADD_CARD, DELETE_CARD, GET_CARDS, MOVE_CARD, UPDATE_CARD } from "./actions";
import {cardsService} from "../../services/cards.service"

export const getCards = (payload) => ({
  type: GET_CARDS,
  payload
});

export const addCard = (payload) => ({
  type: ADD_CARD,
  payload
});

export const moveCard = (payload) => ({
  type: MOVE_CARD,
  payload
});

export const updateCard = (payload) => ({
  type: UPDATE_CARD,
  payload
});

export const deleteCard = (payload) => ({
  type: DELETE_CARD,
  payload
});


export const getCardsThunk = () => {
  return (dispatch) => {
    cardsService.getCards().then(({data}) => {
      dispatch(getCards(data))
    })
  }
}

export const addCardThunk = (payload) => {
  return (dispatch) => {
    cardsService.addCard(payload).then(({ data }) => {
      dispatch(addCard(data));
    })
  }
}

export const deleteCardThunk = ({id, row}) => {
  return (dispatch) => {
    cardsService.deleteCard(id).then(() => {
      dispatch(deleteCard({id, row}))
    })
  }
}

export const moveCardThunk = (payload) => {

  return (dispatch) => {
    cardsService.moveCard({
      id: payload.draggableId,
      row: payload.destination.droppableId,
      seq_num: payload.destination.index
    }).then(() => {
      dispatch(moveCard(payload))
    })
  }
}