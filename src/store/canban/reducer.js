import { omit } from "lodash";
import { combineReducers } from "redux";
import { ADD_CARD, DELETE_CARD, GET_CARDS, MOVE_CARD } from "./actions";

const initialState = {
  cards: {},
  rows: {
    "0": {
      id: "0",
      title: 'НУЖНО ВЫПОЛНИТЬ',
      cards_ids: [],
    },
    "1": {
      id: "1",
      title: 'ВЫПОЛНЯЕТСЯ',
      cards_ids: [],
    },
    "2": {
      id: "2",
      title: 'НУЖНЫ РЕСУРСЫ',
      cards_ids: [],
    },
    "3": {
      id: "3",
      title: 'ВЫПОЛНЕНО',
      cards_ids: [],
    }
  }
}

const cards = (state = initialState.cards, action) => {
  switch (action.type) {
    case GET_CARDS: {
      const cards = {}
      action.payload.forEach(card => {
        cards[card.id] = omit(card, ['seq_num']);
      });
      return cards
    }
    case ADD_CARD:
      return {
        ...state,
        [action.payload.id]: action.payload,
      }
    case DELETE_CARD:
      return omit(state, [action.payload.id])
    case MOVE_CARD:
      const payload = action.payload
      return {
        ...state, [payload.draggableId]: {
          ...state[payload.draggableId],
          row: payload.destination.droppableId,
        }
      }
    default:
      return state;
  }
};

const rows = (state = initialState.rows, action) => {
  switch (action.type) {
    case GET_CARDS:
      const newState = { ...state }
      action.payload.forEach(card => {
        newState[card.row].cards_ids.splice(card.seq_num, 0, card.id)
      })
      return newState

    case ADD_CARD:
      return {
        ...state,
        [action.payload.row]: {
          ...state[action.payload.row],
          cards_ids: [
            ...state[action.payload.row].cards_ids, action.payload.id
          ],
        }
      }
    case DELETE_CARD:
      return {
        ...state,
        [action.payload.row]: {
          ...state[action.payload.row],
          cards_ids: state[action.payload.row].cards_ids.filter(id => id !== action.payload.id)
        }
      }
    case MOVE_CARD:
      const { destination, source } = action.payload
      const draggableId = Number(action.payload.draggableId);

      if (source.droppableId === destination.droppableId) {
        const ids = [...state[destination.droppableId].cards_ids];
        ids.splice(source.index, 1);
        ids.splice(destination.index, 0, draggableId);
        
        return {
          ...state,
          [destination.droppableId]: {
            ...state[destination.droppableId],
            cards_ids: ids,
          }
        }
      } else {
        const sourceIds = [...state[source.droppableId].cards_ids];
        const destinationIds = [...state[destination.droppableId].cards_ids];
        sourceIds.splice(source.index, 1);
        destinationIds.splice(destination.index, 0, draggableId);

        return {
          ...state,
          [source.droppableId]: {
            ...state[source.droppableId],
            cards_ids: sourceIds
          },
          [destination.droppableId]: {
            ...state[destination.droppableId],
            cards_ids: destinationIds
          }
        }
      }
    default:
      return state;
  }
};

export default combineReducers({
  cards,
  rows
})