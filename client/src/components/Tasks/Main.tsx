import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { Column } from "./";
import { useState } from "react";

const fakeColumns = [
  {
    id: "1",
    tasks: [
      { text: "Todo", id: uuidv4() },
      { text: "Todododo", id: uuidv4() },
    ],
    title: "Today Todo",
  },
  {
    id: "2",
    tasks: [
      { text: "Todo", id: uuidv4() },
      { text: "Todododo", id: uuidv4() },
    ],
    title: "Tomorrow Todo",
  },
];

const Main = () => {
  const [columns, setColumns] = useState(fakeColumns);

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //Deep object copy
    const newColumns = [
      ...columns.map((column) => {
        return {
          ...column,
          tasks: [...column.tasks],
        };
      }),
    ];

    if (type === "column") {
      const draggableColumn = newColumns.splice(source.index, 1)[0];
      newColumns.splice(destination.index, 0, draggableColumn);

      return setColumns(newColumns);
    }

    const sourceColumn = newColumns.filter(
      (column) => column.id === source.droppableId
    )[0];
    const draggableTask = sourceColumn.tasks.splice(source.index, 1)[0];

    if (source.droppableId === destination?.droppableId) {
      sourceColumn.tasks.splice(destination.index, 0, draggableTask);

      return setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === sourceColumn.id ? sourceColumn : column
        )
      );
    }

    const destinationColumn = newColumns.filter(
      (column) => column.id === destination?.droppableId
    )[0];
    destinationColumn.tasks.splice(destination.index, 0, draggableTask);

    return setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === sourceColumn.id) {
          return sourceColumn;
        }
        if (column.id === destinationColumn.id) {
          return destinationColumn;
        }
        return column;
      });
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columns.map((column, index) => (
              <Column
                key={column.id}
                id={column.id}
                titleText={column.title}
                tasks={column.tasks}
                index={index}
              />
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default Main;
