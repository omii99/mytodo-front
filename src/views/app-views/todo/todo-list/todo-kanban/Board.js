import React, {useContext, useState} from 'react';
import {ScrumboardContext} from './ScrumboardContext';
import {Draggable} from 'react-beautiful-dnd';
import BoardCard from './BoardCard';
import {modalModeTypes} from './utils';


const Board = ({
                   title,
                   contents,
                   index,
                   isScrollable,
                   isCombineEnabled,
                   useClone,
               }) => {
    const {
        updateModal,
        updateModalMode,
        updateCurrentListId,
        updateCardData,
        columns,
        updateColumns,
        ordered,
        updateOrdered,
    } = useContext(ScrumboardContext);
    const [renameActive, setRenameActive] = useState('');

    const onUpdateCardModal = (obj, listId) => {
        updateModal(true);
        updateModalMode(modalModeTypes(1));
        updateCurrentListId(listId);
        updateCardData(obj);
    };

    const onFinish = (newTitle) => {
        if (newTitle) {
            const newColumns = {};
            delete Object.assign(newColumns, columns, {[newTitle]: columns[title]})[
                title
                ];
            const newOrder = ordered.map((elm) => {
                if (elm === title) {
                    return newTitle;
                }
                return elm;
            });
            updateColumns(newColumns);
            updateOrdered(newOrder);
        }
        setRenameActive('');
    };

    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <div
                    className='board-column'
                >
                    <div className='board-title'>
                                <h4 className='mb-0'>{title}</h4>

                    </div>
                    <BoardCard
                        listId={title}
                        listType='CONTENT'
                        className={snapshot.isDragging ? 'is-dragging' : ''}
                        contents={contents}
                        internalScroll={isScrollable}
                        isCombineEnabled={isCombineEnabled}
                        useClone={useClone}
                        cardData={onUpdateCardModal}
                    />
                </div>
            )}
        </Draggable>
    );
};

export default Board;
