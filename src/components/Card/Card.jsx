import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from './Card.module.css'
import deleteImage from '../../assets/sprites/delete.png'
import { useDispatch } from "react-redux";
import { deleteCardThunk } from "../../store/canban/actionCreators";

const Card = ({ card, index }) => {
  const dispatch = useDispatch()

  const onDeleteCard = ({ row, id }) => {
    dispatch(deleteCardThunk({ row, id }))
  }

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <p>{card.text}</p>
          <button onClick={() => onDeleteCard(card)} className={styles.deleteBtn}>
            <img src={deleteImage} alt="delete" />
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default Card