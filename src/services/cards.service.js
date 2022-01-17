import {instance} from './instance'

const getCards = () => {
  return instance("cards/")
}

const addCard = (data) => {
  return instance.post("cards/", data)
}

const moveCard = (data) => {
  return instance.patch("cards/" + data.id, data)
}

const deleteCard = (id) => {
  return instance.delete("cards/" + id )
}

export const cardsService = {
  getCards,
  addCard,
  moveCard,
  deleteCard
}