import styled from "styled-components";
import EditSvg from "../../images/edit.svg";
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

type TaskType = {
  id: string;
  text: string;
};

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  index: number;
};

const Column: React.FC<PropsType> = ({ title, id, tasks, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Header {...provided.dragHandleProps}>
            <Title>{title}</Title>
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
          <AddButton>
            <AddButtonText>+ Add another card</AddButtonText>
          </AddButton>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  width: 272px;
  border-radius: 5px;
  background-color: #ebecf0;
  padding: 8px;
  font-size: 15px;
  margin: 20px 0px 20px 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  cursor: pointer !important;
`;
const Title = styled.h3`
  font-weight: 600;
  color: #172b4d;
  font-size: 18px;
  padding: 3px;
  flex: 1;
  word-break: break-word;
  display: flex;
  align-items: center;
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
  &:hover {
    transition: 0.15s;
    background-color: rgba(9, 30, 66, 0.08);
  }
`;
const Tasks = styled.ul`
  display: flex;
  flex-direction: column;
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
  &:hover {
    background-color: #dddfe4;
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
  &:hover {
    background-color: #bdc1cc;
  }
`;
const TaskButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;
const AddButton = styled.button`
  background-color: transparent;
  padding: 6px 10px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  &:hover {
    background: #dddfe4;
  }
`;
const AddButtonText = styled.span`
  font-size: 15px;
`;

export default Column;
