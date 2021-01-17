import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { Column } from "./";

const fakeTasks1 = [
  { text: "Todo", id: uuidv4() },
  { text: "Todododo", id: uuidv4() },
];

const fakeTasks2 = [
  { text: "Todo", id: uuidv4() },
  { text: "Todododo", id: uuidv4() },
];

const Main = () => {
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Column id="1" title="Today Todo" tasks={fakeTasks1} />
        <Column id="2" title="Tomorrow Todo" tasks={fakeTasks2} />
      </DragDropContext>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

export default Main;
