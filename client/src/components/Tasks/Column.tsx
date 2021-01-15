import styled from "styled-components";
import EditSvg from "../../images/edit.svg";

const Column = () => {
  return (
    <Container className="container">
      <Header className="header">
        <Title className="title">Today Todo</Title>
        <FunctionsButton className="functions-button" />
      </Header>
      <Tasks className="tasks">
        <Task className="task">
          <TaskText>Todo</TaskText>
          <TaskButton>
            <TaskButtonImage src={EditSvg} />
          </TaskButton>
        </Task>
        <Task className="task">
          <TaskText>Todo</TaskText>
          <TaskButton>
            <TaskButtonImage src={EditSvg} />
          </TaskButton>
        </Task>
      </Tasks>
      <AddButton className="add">
        <AddButtonText>+ Add another card</AddButtonText>
      </AddButton>
    </Container>
  );
};

const Container = styled.div`
  width: 272px;
  border-radius: 5px;
  background-color: #ebecf0;
  padding: 8px;
  font-size: 15px;
  margin: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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
const Task = styled.li`
  background-color: #fff;
  border-radius: 3px;
  margin-bottom: 6px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
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
