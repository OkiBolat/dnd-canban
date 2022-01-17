import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import { addCardThunk } from "../../store/canban/actionCreators";
import { cardsSelector } from "../../store/canban/selectors";
import Card from "../Card/Card";
import styles from "./Row.module.css"
import { COLUMN_COLORS } from "../../constants/colors";

const Row = ({ row }) => {
  const dispatch = useDispatch()
  const cards = useSelector(cardsSelector)

  const [openAddForm, setOpenAddForm] = useState(false)
  const [textInput, setTextInput] = useState('')

  const rowCards = useMemo(
    () => row.cards_ids.map((id) => cards[id]),
    [cards, row]
  )

  const onInputChange = (e) => {
    setTextInput(e.target.value)
  }

  const openAddCardForm = () => {
    setOpenAddForm(!openAddForm)
    setTextInput('')
  }

  const onAddCard = () => {
    dispatch(addCardThunk({
      text: textInput,
      row: row.id,
      seq_num: rowCards.length,
    }))
    setOpenAddForm(!openAddForm)
  }

  return (
    <div className={styles.container}>
      <div style={{ backgroundColor: COLUMN_COLORS[row.id] }} className={styles.title}>{row.title}</div>
      <Droppable droppableId={row.id}>
        {(provided) => (
          <div className={styles.list} {...provided.droppableProps} ref={provided.innerRef}>

            {rowCards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}{provided.placeholder}
          </div>
        )}
      </Droppable>
      {openAddForm &&
        <div className={styles.added}>
          <textarea value={textInput} onChange={onInputChange} name="textarea"></textarea>
          <button onClick={onAddCard} className={styles.addCardBtn}>Add card</button>
        </div>
      }
      {!openAddForm && <button className={styles.addCardBtn} onClick={openAddCardForm}>Add card</button>}
    </div>
  )
};

export default Row;