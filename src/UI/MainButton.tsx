import styled from "styled-components"

const StyledBtn = styled.button`
width: 100%;
font-weight: 400;
font-size: 20px;
line-height: 27px;
color: #FFFFFF;
padding: 7px;
background: #F06543;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
border-radius: 21px;
border: 0;
transition: 200ms linear;
&:active {
    opacity: .65;
}
&:disabled {
    background-color: #C8C8C8;
}
`


export default StyledBtn