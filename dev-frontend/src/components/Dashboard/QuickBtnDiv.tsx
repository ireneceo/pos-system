import styled from 'styled-components';

const QuickBtnDiv = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #C7CED6;
  cursor: pointer;

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

export default QuickBtnDiv;