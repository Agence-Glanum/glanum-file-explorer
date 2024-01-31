import MixComponent from '../components/mix/mix'

export const Mix: React.FC<{url: string}> = ({url}: {url: string}) => {
    return <MixComponent url={url}/>
}