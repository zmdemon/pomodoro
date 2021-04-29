import React from "react";
import styled from "styled-components";

interface WrapperProps {
    title: string
    children: JSX.Element[]
    onCrossClick: React.MouseEventHandler<HTMLButtonElement> | undefined
    className:string

}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1337;
  overflow-y: hidden;

`;

const MenuWrapperDiv = styled.div`
      box-sizing: border-box;
      width: 350px;
      height: 300px;
      padding: 0 15px 15px;
      border: 3px solid black;
      border-radius: 10px;
      background: whitesmoke;
      overflow-y: hidden;

      h4 {
        margin: 15px 0;
        font-weight: bold;
      }

      

      section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
      }
    `;
const Cross = styled.button`
      height: 50%;
      margin: 0;
      background: white;
    `;
const Title = styled.h3`

    `;

const TopBlock = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;

      h3 {
        margin: 0;
        
      }
    `;

const Divider = styled.hr`
      border: none;
      background-color: rgba(96, 102, 110, .5);
      height: 0.5px;
    `;

const Setting = styled.div`
      margin-bottom: 15px;
    `;


function MenuWrapper(Props: WrapperProps) {

    const settings = Props.children.map(set=>{
        return <>
            <Divider/>
            <Setting>{set}</Setting>
        </>
    })

    return (
        <Wrapper className={Props.className}>
            <MenuWrapperDiv>
                <TopBlock>
                    <Title>{Props.title}</Title>
                    <Cross onClick={Props.onCrossClick}>x</Cross>
                </TopBlock>

                {settings}

            </MenuWrapperDiv>

        </Wrapper>
    )
}

export default MenuWrapper