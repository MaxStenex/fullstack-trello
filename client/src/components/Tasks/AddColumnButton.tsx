import React, { useState } from "react";
import styled from "styled-components";
import CloseSvg from "../../images/close_form.svg";
import { Form, Formik, Field } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_TASK_COLUMN_MUTATION } from "../../graphql/mutation/createTaskColumn";
import { CreateTaskColumnResponseType, TaskColumnType } from "../../types/graphql";

type Props = {
  addColumn: (column: TaskColumnType) => void;
  newColumnIndex: number | null;
};

const AddColumnButton: React.FC<Props> = ({ addColumn, newColumnIndex }) => {
  const [isFormOpened, setFormOpened] = useState(false);
  const [createTaskColumn, { loading }] = useMutation<
    CreateTaskColumnResponseType,
    { title: string; index: number }
  >(CREATE_TASK_COLUMN_MUTATION);

  return isFormOpened ? (
    <Container>
      <Formik
        initialValues={{ columnTitle: "" }}
        onSubmit={async ({ columnTitle }, { resetForm }) => {
          const { data } = await createTaskColumn({
            variables: { title: columnTitle, index: newColumnIndex || 0 },
          });

          if (data?.createTaskColumn.taskColumn) {
            resetForm();
            addColumn(data.createTaskColumn.taskColumn);
            setFormOpened(false);
          }
        }}
      >
        {() => (
          <AddForm>
            <ColumnTitleInput
              placeholder="Enter list title..."
              type="text"
              name="columnTitle"
              autoFocus
            />
            <Buttons>
              <SubmitButton disabled={loading} type="submit">
                Add List
              </SubmitButton>
              <CloseButton type="button" onClick={() => setFormOpened(false)}>
                <CloseButtonImage src={CloseSvg} alt="#" />
              </CloseButton>
            </Buttons>
          </AddForm>
        )}
      </Formik>
    </Container>
  ) : (
    <Container>
      <OpenFormButton onClick={() => setFormOpened(true)}>
        <OpenFormButtonText>+ Add another list</OpenFormButtonText>
      </OpenFormButton>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  margin-left: 15px;
  min-width: 272px;
  border-radius: 5px;
  background-color: #ebecf0;
  font-size: 15px;
  margin-left: 15px;
`;
const OpenFormButton = styled.button`
  width: 100%;
  max-height: 33px;
  background-color: #fff;
  opacity: 0.5;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  &:hover,
  &:focus {
    opacity: 1;
    transition: 0.2s;
  }
`;
const OpenFormButtonText = styled.span``;

const AddForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 6px;
`;
const ColumnTitleInput = styled(Field)`
  padding: 5px 7px;
  border-radius: 3px;
  border: 2px solid #386ef8;
  font-size: 15px;
`;
const Buttons = styled.div`
  margin-top: 5px;
  align-items: center;
  display: flex;
`;
const SubmitButton = styled.button`
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
const CloseButton = styled.button`
  border-radius: 3px;
  &:hover,
  &:focus {
    background-color: #dadada;
    transition: 0.2s;
  }
`;
const CloseButtonImage = styled.img`
  display: block;
  width: 25px;
  height: 25px;
`;

export default AddColumnButton;
