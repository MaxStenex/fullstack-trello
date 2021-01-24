import styled from "styled-components";
import { useEffect, useState } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Column, AddColumnButton } from "./";
import { useQuery } from "@apollo/client";
import { USER_TASK_COLUMNS_QUERY } from "../../graphql/query/userTaskColumns";
import { TaskColumnType, TaskType, UserTaskColumnsQueryType } from "../../types/graphql";

const Main = () => {
  const [columns, setColumns] = useState<Array<TaskColumnType> | null>(null);
  const { data } = useQuery<UserTaskColumnsQueryType>(USER_TASK_COLUMNS_QUERY);
  useEffect(() => {
    if (data?.userTaskColumns.taskColumns) {
      const sortedColumns = [...data.userTaskColumns.taskColumns].sort((a, b) => {
        return a.index - b.index;
      });

      setColumns(sortedColumns);
    }
  }, [data?.userTaskColumns.taskColumns]);

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    if (!destination || !columns) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //Deep array copy
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
      (column) => column.id.toString() === source.droppableId
    )[0];
    const draggableTask = sourceColumn.tasks.splice(source.index, 1)[0];

    if (source.droppableId === destination?.droppableId) {
      sourceColumn.tasks.splice(destination.index, 0, draggableTask);

      return setColumns(
        (prevColumns) =>
          prevColumns &&
          prevColumns.map((column) =>
            column.id === sourceColumn.id ? sourceColumn : column
          )
      );
    }

    const destinationColumn = newColumns.filter(
      (column) => column.id.toString() === destination?.droppableId
    )[0];
    destinationColumn.tasks.splice(destination.index, 0, draggableTask);

    return setColumns(
      (prevColumns) =>
        prevColumns &&
        prevColumns.map((column) => {
          if (column.id === sourceColumn.id) {
            return sourceColumn;
          }
          if (column.id === destinationColumn.id) {
            return destinationColumn;
          }
          return column;
        })
    );
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <DragContainer {...provided.droppableProps} ref={provided.innerRef}>
              {columns &&
                columns.map((column, index) => (
                  <Column
                    key={column.id}
                    id={column.id.toString()}
                    titleText={column.title}
                    tasks={column.tasks}
                    index={index}
                    addTask={(newTask: TaskType, columnId: number) => {
                      const newColumns = [
                        ...columns.map((column) => {
                          return {
                            ...column,
                            tasks: [...column.tasks],
                          };
                        }),
                      ];
                      setColumns(
                        newColumns.map((column) => {
                          if (column.id === columnId) {
                            column.tasks = [...column.tasks, newTask];
                            return column;
                          }
                          return column;
                        })
                      );
                    }}
                  />
                ))}
              {provided.placeholder}
            </DragContainer>
          )}
        </Droppable>
      </DragDropContext>
      <AddColumnButton
        addColumn={(column) => {
          setColumns((prevColumns) => {
            if (prevColumns) {
              return [...prevColumns, column];
            }
            return [column];
          });
        }}
        newColumnIndex={columns && columns.length}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: flex-start;
  overflow-x: auto;
  // 100vh - (Header height + margin-top)
  min-height: calc(100vh - 72px);
`;
const DragContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default Main;
