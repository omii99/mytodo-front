import React, { useContext, useEffect, useState } from "react";
import { ScrumboardContext, ScrumboardProvider } from "./ScrumboardContext";
import Board from "./Board";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "./reoreder";
import { createCardObject, modalModeTypes } from "./utils";
import { Scrollbars } from "react-custom-scrollbars";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getKanbanTodoLoading,
  updateTodoStage,
} from "../../redux/action/todoAction";
import { Row, Spin } from "antd";

const ScrumboardWrapper = (props) => {
  const {
    ordered,
    columns,
    cardData,
    currentListId,
    updateOrdered,
    updateColumns,
    updateModal,
    updateCurrentListId,
  } = useContext(ScrumboardContext);
  const onDragEnd = async (result) => {
    if (result.combine) {
      // if (result.type === 'COLUMN') {
      //     const shallow = [...ordered];
      //     shallow.splice(result.source.index, 1);
      //     updateOrdered(shallow);
      //     return;
      // }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const newColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      updateColumns(newColumns);
      return;
    }

    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // if (result.type === 'COLUMN') {
    //     const newOrdered = reorder(ordered, source.index, destination.index);
    //     updateOrdered(newOrdered);
    //     return;
    // }
    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });
    updateColumns(data.quoteMap);
    let updatedTodo;
    if (result.destination.droppableId === "Todo") {
      updatedTodo = data.quoteMap["Todo"][result.destination.index];
    } else if (result.destination.droppableId === "Research") {
      updatedTodo = data.quoteMap["Research"][result.destination.index];
    } else if (result.destination.droppableId === "Inprogress") {
      updatedTodo =
        data.quoteMap["Inprogress"][result.destination.index];
    } else if (result.destination.droppableId === "Review") {
      updatedTodo =
        data.quoteMap["Review"][result.destination.index];
    } else {
      updatedTodo =
        data.quoteMap["Completed"][result.destination.index];
    } 
    // else {
    //   updatedTodo =
    //     data.quoteMap["5M Purchases"][result.destination.index];
    // }
    let stageId = 1;
    let stageName = "";
    switch (result.destination.droppableId) {
      case "Todo":
        stageId = 1;
        stageName = "Todo";
        break;
      case "Research":
        stageId = 2;
        stageName = "Research";
        break;
      case "Inprogress":
        stageId = 3;
        stageName = "Inprogress";
        break;
      case "Review":
        stageId = 4;
        stageName = "Review";
        break;
      case "Completed":
        stageId = 5;
        stageName = "Completed";
        break;
      // case "5M Purchases":
      //   stageId = 6;
      //   stageName = "5M Purchases";
        break;
    }
    updatedTodo.stageid = stageId;
    updatedTodo.stagename = stageName;
    try {
      await props.updateTodoStage({
        id: updatedTodo.id,
        stageid: stageId,
        name: stageName,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onCloseModal = () => {
    updateModal(false);
  };

  const onModalSubmit = (values, mode) => {
    const data = columns;
    if (mode === modalModeTypes(0)) {
      let newCard = createCardObject();
      newCard.name = values.cardTitle ? values.cardTitle : "Untitled Card";
      data[currentListId].push(newCard);
      updateColumns(data);
      updateModal(false);
      updateCurrentListId("");
    }

    if (mode === modalModeTypes(1)) {
      const updatadedCard = data[currentListId].map((elm) => {
        if (values.id === elm.id) {
          elm = values;
        }
        return elm;
      });
      data[currentListId] = updatadedCard;
      updateColumns(data);
      updateModal(false);
    }

    if (mode === modalModeTypes(2)) {
      data[values.boardTitle ? values.boardTitle : "Untitled Board"] = [];
      const newOrdered = [
        ...ordered,
        ...[values.boardTitle ? values.boardTitle : "Untitled Board"],
      ];
      let newColumns = {};
      newOrdered.forEach((elm) => {
        newColumns[elm] = data[elm];
      });
      updateColumns(newColumns);
      updateOrdered(Object.keys(newColumns));
      updateModal(false);
    }
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Row justify='center' align='middle' style={{ height: "70vh" }}>
          <Spin spinning={loading} style={{ opacity: 1 }} size={"large"}>
            <div></div>
          </Spin>
        </Row>
      ) : (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {props.containerHeight ? (
            <div className='scrumboard'>
              <BoardWrapper {...props} />
            </div>
          ) : (
            <BoardWrapper {...props} />
          )}
        </DragDropContext>
      )}
    </>
  );
};
const BoardWrapper = ({
  containerHeight,
  useClone,
  isCombineEnabled,
  withScrollableColumns,
}) => {
  const { ordered, columns, updateModal, updateModalMode } = useContext(
    ScrumboardContext
  );

  const onAddBoardModal = () => {
    updateModal(true);
    updateModalMode(modalModeTypes(2));
  };
  return (
    <Droppable
      droppableId='board'
      type='COLUMN'
      direction='horizontal'
      ignoreContainerClipping={containerHeight}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided) => (
        <div
          className='scrumboard'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Scrollbars className='scrumboard-body'>
            {ordered.map((key, index) => (
              <Board
                key={key}
                index={index}
                title={key}
                contents={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                useClone={useClone}
              />
            ))}
          </Scrollbars>
        </div>
      )}
    </Droppable>
  );
};

const TodoKanban = (props) => {
  const { getKanbanTodoLoading } = props;
  useEffect(() => {
    getKanbanTodoLoading();
  }, []);

  return (
    <ScrumboardProvider>
      <ScrumboardWrapper {...props} />
    </ScrumboardProvider>
  );
};

TodoKanban.prototype = {
  columns: PropTypes.object.isRequired,
  columnLoading: PropTypes.object.isRequired,
  updateTodoStage: PropTypes.func.isRequired,
  getKanbanTodoLoading: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    columns: state.todo.columns,
    columnLoading: state.todo.kanbanLoading,
  };
};

export default connect(mapStateToProps, {
  getKanbanTodoLoading,
  updateTodoStage,
})(TodoKanban);
