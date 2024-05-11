import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";


const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    // fetch trailer video && updating the store with trailer video data
    // to render video trailer, we'll need movieID
    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', API_OPTIONS);
        const json = await data.json();
        // console.log(json.results);

        const filterData = json?.results?.filter(video => video.type === 'Trailer');
        // handling the case where trailer doesn't exist, then it will take first video from json
        const trailer = filterData.length ? filterData[0] : json?.results[0];
        // adding trailer video inside moviesSlice
        // console.log('trailer', trailer)
        dispatch(addTrailerVideo(trailer))
        // Every youtube video has a key, e.g take key from trailer and replace it with existing youtube video key
        // https://www.youtube.com/watch?v=pz6qx4n2Ewc // v=key

        // to get running video code 
        // from youtube video --> click on Share --> click on embed --> copy iframe code

    }

    useEffect(() => {
        getMovieVideos();
    }, [])
}

export default useMovieTrailer;