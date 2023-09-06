import { useState } from 'react'
import { Map, MapMarker, ZoomControl } from 'react-kakao-maps-sdk'
const Mapping = ()=>{
    const [ latlng, setLatlng ]= useState({
        lat : 35.712056,
        lng : 129.313405
    })
    const [ level, setLevel ] = useState(3)
    const { lat, lng } = latlng
    return (
        <Map
            center={{ lat, lng }}
            style={{ width: "100%", height: "360px" }}
            level={3} // 지도의 확대 레벨
            onZoomChanged={(map) => setLevel(map.getLevel())}
        >
            <ZoomControl />
            <MapMarker position={{ lat, lng }}>
            </MapMarker>
        </Map>
    )
}
export default Mapping