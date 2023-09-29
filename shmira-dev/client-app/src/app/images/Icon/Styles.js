import styled from 'styled-components'

export const StyledIcon = styled.i`
    display: inline-block;
    font-size: ${(props) => props.size}px;
    ${(props) =>
        props.left || props.top
            ? `transform: translate(${props.left}px, ${props.top}px);`
            : ''}
    ${(props) =>
        props.isSVG
            ? ''
            : `
    &:before {
      content: "${props.code}";  // <- Directly use the prop without nested template literal
      font-family: "jira" !important;
      font-style: normal;
      font-weight: normal;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `}
`
