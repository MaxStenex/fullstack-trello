import { useState } from "react";
import styled from "styled-components";
import CloseFormSvg from "../../images/close_form.svg";

const AddTaskButton = () => {
  const [isFormOpened, setFormOpened] = useState(false);

  return isFormOpened ? (
    <Form>
      <TodoText placeholder="Enter new card description" />
      <Buttons>
        <AddCard type="submit" className="addcard">
          Add card
        </AddCard>
        <CloseFormButton onClick={() => setFormOpened(false)}>
          <CloseFormImage src={CloseFormSvg} />
        </CloseFormButton>
      </Buttons>
    </Form>
  ) : (
    <AddButton onClick={() => setFormOpened(true)}>
      <AddButtonText>+ Add another card</AddButtonText>
    </AddButton>
  );
};

const AddButton = styled.button`
  background-color: transparent;
  padding: 6px 10px;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  &:hover,
  &:focus {
    background: #dddfe4;
  }
`;
const AddButtonText = styled.span`
  font-size: 15px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const TodoText = styled.textarea`
  padding: 5px;
  flex: 1;
  display: block;
  border-radius: 3px;
  resize: none;
  overflow: auto;
  min-height: 74px;
  border: 2px solid transparent;
  box-shadow: 0px 1px 0.5px #ccc;
  &:focus {
    border: 2px solid #ccc;
  }
`;
const Buttons = styled.div`
  display: flex;
  margin: 10px 5px;
`;
const AddCard = styled.button`
  background-color: #5aac44;
  color: #fff;
  padding: 5px 15px;
  font-size: 15px;
  border-radius: 3px;
  margin-right: 10px;
  &:hover,
  &:focus {
    transition: 0.2s;
    background-color: #72db54;
  }
`;
const CloseFormButton = styled.button`
  border-radius: 3px;
  &:hover,
  &:focus {
    background-color: #dadada;
    transition: 0.2s;
  }
`;
const CloseFormImage = styled.img`
  display: block;
  width: 25px;
  height: 25px;
`;

export default AddTaskButton;
