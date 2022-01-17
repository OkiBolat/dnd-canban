import React, { useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "react-redux";
import { rowsListSelector } from "../../store/canban/selectors";
import WithAuthRedirect from "../../components/WithAuthRedirect";
import styles from "./Canban.module.css"
import Row from "../../components/Row/Row";
import { getCardsThunk, moveCardThunk } from "../../store/canban/actionCreators";

const Canban = () => {
  const dispatch = useDispatch()
  const rows = useSelector(rowsListSelector)

  useEffect(() => {
    dispatch(getCardsThunk())
  }, [dispatch])

  const onDragEnd = (props) => {
    console.log(props)
    if(!props.destination) return;
  
    dispatch(moveCardThunk(props))
  }

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        {rows.map((row) => (
          <Row key={row.id} row={row} />
        ))}
      </div>
    </DragDropContext>
  )
}

export default WithAuthRedirect(Canban);