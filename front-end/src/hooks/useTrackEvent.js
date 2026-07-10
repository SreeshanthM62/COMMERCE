import axios from "axios";


const useTrackEvent = () => {

    const track = async (productId, eventType, token, backendURL) => {

        if (!token) return;

        try {

            await axios.post(
                backendURL + "/api/recommendations/track-event",
                { productId, eventType },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

        } catch (error) {

            console.error("Failed to track event:", error);

        }

    };

    return track;

};

export default useTrackEvent;