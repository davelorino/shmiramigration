import styled, { css } from 'styled-components'
import { Input } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import { FaChartLine } from 'react-icons/fa'

export const SearchFilter = styled(Input)`
    margin-left: 40px !important;
    margin-bottom: 20px !important;
    margin-right: 30px !important;
`

export const SearchTextInput = styled(Input)`
    margin-left: 10px !important; 
    margin-right: 20px !important;
`

export const LinkToInsightsIcon = styled(FaChartLine)`
    cursor: pointer !important;
    color: #deebff !important;
    float: right !important;
    top: 10px !important;
    display: inline-block !important;
    padding-bottom: 0px !important;
    margin-bottom: 0px !important;
    bottom: 0px !important;
`

export const OnlyMyIssuesFilter = styled.div`
    cursor: pointer !important;
    color: #deebff;
    margin-left: 30px !important;
    align-items: center !important;
    padding-top: 15px !important;
    display: inline-block !important;
`

export const ClearAllFilters = styled.div`
    cursor: pointer;
    color: #deebff;
    margin-left: 15px;
    align-items: center;
    padding-top: 15px;
    display: inline-block;
`

export const LinkToInsightsPage = styled.div`
    margin-top: 18px;
    margin-right: 10px;
    float: right;
    display: inline-block;
`

export const LinkToInsightsPageText = styled.p`
    cursor: pointer;
    color: #deebff;
    float: right;
    bottom: 5px;
    margin-right: 8px;
    margin-bottom: 5px;
    margin-left: 5px;
    display: inline-block;
`

interface IStyledAvatar {
    index: number
}

export const StyledAvatar = styled(Avatar)`
    &:hover {
        //transform: translateY(-3px);
    }
    cursor: pointer;
    filter: brightness(80%);
    //margin-left: -6px;
`

export const StyledLabelAvatar = styled(Avatar)`
    &:hover {
        //transform: translateY(-3px);
    }
    cursor: pointer;
    filter: brightness(85%);
    margin-right: 12px;
    //margin-left: -6px;
`

export const SelectedAvatar = styled(Avatar)`
    &:hover {
        //transform: translateY(-3px);
    }
    outline: 1px;
    overflow: visible;
    outline-style: solid;
    outline-color: '#FFFFFF !important';
    cursor: pointer;
`

interface IActiveAvatar {
    isActive: boolean
    index: number
}

export const AvatarIsActiveBorder = styled.div<IActiveAvatar>`
    display: inline-block;
    border-radius: 50%;
    //position: relative;
    margin-right: -6px;
    direction: ltr;
    ${(props) => props.isActive && `border: 2px solid #0052cc !important; `}

    &:hover {
        transform: translateY(-7px) !important;
    }
`

export const AvatarIsActiveLabelBorder = styled.div<IActiveAvatar>`
    display: inline-block;
    border-radius: 50%;
    //position: relative;
    margin-right: -6px;
    direction: ltr;
    ${(props) => props.isActive && `border: 2px solid #0052cc !important; `}
`
