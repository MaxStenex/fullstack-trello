import styled from "styled-components";
import { useEffect, useState } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { Column, AddColumnButton } from "./";
import { useMutation, useQuery } from "@apollo/client";
import { USER_TASK_COLUMNS_QUERY } from "../../graphql/query/userTaskColumns";
import {
  TaskColumnType,
  TaskType,
  UserTaskColumnsQueryType,
  ChangeColumnsOrderResponse,
  ChangeTasksOrderResponse,
} from "../../types/graphql";
import { makeTaskColumnsCopy } from "../../utils/makeTaskColumnsCopy";
import { CHANGE_COLUMNS_ORDER_MUTATION } from "../../graphql/mutation/changeColumnsOrder";
import { CHANGE_TASKS_ORDER_MUTATION } from "../../graphql/mutation/changeTasksOrder";

type ChangeTasksOrderInputType = {
  sourceColumnId: number;
  destinationColumnId: number;
  sourceTaskIndex: number;
  destinationTaskIndex: number;
};

const Main = () => {
  const [columns, setColumns] = useState<Array<TaskColumnType> | null>(null);
  const { data } = useQuery<UserTaskColumnsQueryType>(USER_TASK_COLUMNS_QUERY);
  const [changeColumnsOrderMutation] = useMutation<
    ChangeColumnsOrderResponse,
    { sourceIndex: number; destinationIndex: number }
  >(CHANGE_COLUMNS_ORDER_MUTATION);
  const [changeTasksOrderMutation] = useMutation<
    ChangeTasksOrderResponse,
    ChangeTasksOrderInputType
  >(CHANGE_TASKS_ORDER_MUTATION);

  useEffect(() => {
    if (data?.userTaskColumns.taskColumns) {
      const sortedColumns = makeTaskColumnsCopy(data.userTaskColumns.taskColumns)
        .sort((a, b) => {
          return a.index - b.index;
        })
        .map((column) => {
          column.tasks = [...column.tasks].sort((a, b) => {
            return a.index - b.index;
          });
          return column;
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
    const newColumns = makeTaskColumnsCopy(columns);

    if (type === "column") {
      const draggableColumn = newColumns.splice(source.index, 1)[0];

      newColumns.splice(destination.index, 0, draggableColumn);

      changeColumnsOrderMutation({
        variables: { sourceIndex: source.index, destinationIndex: destination.index },
      });
      return setColumns(newColumns);
    }

    const sourceColumn = newColumns.filter(
      (column) => column.id.toString() === source.droppableId
    )[0];
    const draggableTask = sourceColumn.tasks.splice(source.index, 1)[0];

    if (source.droppableId === destination.droppableId) {
      sourceColumn.tasks.splice(destination.index, 0, draggableTask);

      changeTasksOrderMutation({
        variables: {
          sourceTaskIndex: source.index,
          destinationTaskIndex: destination.index,
          sourceColumnId: +source.droppableId,
          destinationColumnId: +destination.droppableId,
        },
      });

      return setColumns(
        (prevColumns) =>
          prevColumns &&
          prevColumns.map((column) =>
            column.id === sourceColumn.id ? sourceColumn : column
          )
      );
    }

    const destinationColumn = newColumns.filter(
      (column) => column.id.toString() === destination.droppableId
    )[0];
    destinationColumn.tasks.splice(destination.index, 0, draggableTask);

    changeTasksOrderMutation({
      variables: {
        sourceTaskIndex: source.index,
        destinationTaskIndex: destination.index,
        sourceColumnId: +source.droppableId,
        destinationColumnId: +destination.droppableId,
      },
    });

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
                    deleteColumn={(columnId) => {
                      const newColumns = makeTaskColumnsCopy(columns);
                      setColumns(newColumns.filter((column) => column.id !== columnId));
                    }}
                    addTask={(newTask: TaskType, columnId: number) => {
                      const newColumns = makeTaskColumnsCopy(columns);
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
                    deleteTask={(taskId, columnId) => {
                      const newColumns = makeTaskColumnsCopy(columns);
                      setColumns(
                        newColumns.map((column) => {
                          if (column.id === columnId) {
                            column.tasks = column.tasks.filter(
                              (task) => task.id !== taskId
                            );
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
