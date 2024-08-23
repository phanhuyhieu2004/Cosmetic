import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
// GoogleMap: Thành phần hiển thị bản đồ Google.
//     LoadScript: Thành phần để tải script của Google Maps API và cung cấp khóa API cho ứng dụng.
//     Marker: Thành phần để đặt điểm đánh dấu (marker) trên bản đồ.
function Contact() {
    const containerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: 21.028511,
        lng: 105.804817,
        // vị độ,kinh độ
    };
    return(
        <>
            {/*Đây là thành phần dùng để tải Google Maps API script*/}
            <LoadScript googleMapsApiKey="AIzaSyDgiP2qG6hDIfPO3aZ-qP_M_fhp_wx4sX8">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </>
    )
}
export default Contact;