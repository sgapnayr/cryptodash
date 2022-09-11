import styled from 'styled-components'

export const ListBarParent = styled.div`
    width: 8vw;
    height: .25rem;
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .4);
    overflow: hidden;
`

export const ListBarChild = styled.div`
    width: ${(props => props.marketCap / props.marketCap24h)}px;
    height: .25rem;
    border-radius: 20px;
    overflow: hidden;
    background: rgba(255,255,255, 1);
`

export const ListBarParent2 = styled.div`
    width: 8vw;
    height: .25rem;
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, .4);
    overflow: hidden;
`

export const ListBarChild2 = styled.div`
    width: ${(props => props.totalVolume / props.totalSupply)}px;
    height: .25rem;
    border-radius: 20px;
    overflow: hidden;
    opacity: 1;
    background: rgba(255,255,255, 1);
`

export const ListWrapper = styled.div`
    font-size: smaller;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
`
