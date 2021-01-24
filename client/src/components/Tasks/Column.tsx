import styled from "styled-components";
import EditSvg from "../../images/edit.svg";
import React, { useCallback, useRef, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddTaskButton from "./AddTaskButton";
import { TaskType, UpdateColumnTitleResponseType } from "../../types/graphql";
import { useMutation } from "@apollo/client";
import { UPDATE_COLUMN_TITLE_MUTATION } from "../../graphql/mutation/updateColumnTitle";

type PropsType = {
  id: string;
  titleText: string;
  tasks: TaskType[];
  index: number;
  addTask: (newTask: TaskType, columnId: number) => void;
};

const Column: React.FC<PropsType> = ({ titleText, id, tasks, index, addTask }) => {
  const [updateTitle, { loading }] = useMutation<
    UpdateColumnTitleResponseType,
    { columnId: number; title: string }
  >(UPDATE_COLUMN_TITLE_MUTATION);

  const [title, setTitle] = useState(titleText);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const closeForm = useCallback((evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (titleInputRef.current && evt.key === "Enter") {
      titleInputRef.current.blur();
    }
  }, []);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Header>
            <Title
              type="text"
              value={title}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(evt.currentTarget.value)
              }
              onBlur={async () => {
                await updateTitle({ variables: { columnId: +id, title } });
              }}
              onKeyPress={closeForm}
              ref={titleInputRef}
              disabled={loading}
            />
            <FunctionsButton />
          </Header>
          <Droppable droppableId={id} type="task">
            {(provided) => (
              <Tasks {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task: TaskType, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <Task
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                      >
                        <TaskText>{task.text}</TaskText>
                        <TaskButton>
                          <TaskButtonImage src={EditSvg} />
                        </TaskButton>
                      </Task>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Tasks>
            )}
          </Droppable>
          <AddTaskButton columnId={+id} addTask={addTask} />
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  width: 272px;
  border-radius: 5px;
  background-color: #ebecf0;
  padding: 0px 8px 8px 8px;
  font-size: 15px;
  margin-left: 15px;
`;
const Header = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  cursor: pointer !important;
`;
const Title = styled.input`
  font-weight: 600;
  color: #172b4d;
  font-size: 18px;
  padding: 3px;
  flex: 1;
  min-width: 50px;
  word-break: break-word;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 3px;
  &:focus {
    border: 2px solid #377adf;
  }
`;
const FunctionsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 32px;
  height: 32px;
  padding: 5px;
  border-radius: 2px;
  &::before {
    content: "...";
    position: absolute;
    top: 0px;
    font-size: 20px;
  }
  &:hover,
  &:focus {
    transition: 0.15s;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
const Tasks = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`;
const Task = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#dddfe4" : "#fff")};
  border-radius: 3px;
  margin-bottom: 6px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  cursor: pointer !important;
  user-select: none;
  &:hover,
  &:focus {
    background-color: #dddfe4;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;
const TaskText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TaskButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  background-color: transparent;
  padding: 5px;
  border-radius: 3px;
  &:hover,
  &:focus {
    background-color: #bdc1cc;
  }
`;
const TaskButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default Column;
