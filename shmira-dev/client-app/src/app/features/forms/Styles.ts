import { Label } from 'semantic-ui-react'
import styled from 'styled-components'
import Icon from '../../images/Icon'
import { color } from '../../shared/utils/styles'
import { font } from '../../shared/utils/styles'

interface ILabel {
    size: string;
}




export const StyledLabel = styled(Label)<ILabel>`
    cursor: pointer;
    &:hover {
        filter: brightness(1.2) !important;
    }
    size: ${(props) => props.size};
`
interface IHoverDiv {
    height?: number;
    padding?: number;
}
export const HoverDiv = styled.div<IHoverDiv>`
    width: 100%;
    height: ${(props) => (props.height ? `${props.height}px` : '100%')};
    padding: ${(props) => (props.padding ? `${props.padding}px ${props.padding}px` : '0px 0px')};   
    cursor: pointer;
    &:hover {
        backdrop-filter: brightness(1.5) !important;
        border: 1px solid white !important;
    }
`

export const TrackingWidget = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
`

export const WatchIcon = styled(Icon)`
    color: ${color.textMedium};
`

export const Right = styled.div`
    width: 90%;
    overflow: hidden;
`

export const BarCont = styled.div`
    //height: 5px;
    //border-radius: 4px;
    //border: solid;
    overflow: hidden;
    //border-color: '#dfe1e6' !important;
    border: 1px solid #dfe1e6;
`

interface IBar {
    width: string
}

export const Bar = styled.div<IBar>`
    //height: 5px;
    //border: 5px 4px solid '#0052cc';
    //border: solid;
    overflow: hidden;
    //transition: all 0.1s;
    border: 4px solid #0052cc;
    width: ${(props) => props.width}%;
    //border-color: "#0052cc" !important;
`

export const Values = styled.div`
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding-top: 3px;
    ${font.size(10.5)};
`
