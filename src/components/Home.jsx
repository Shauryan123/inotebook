import { useEffect } from 'react';
import Notes from './Notes';


export const Home = () => {

    useEffect(() => {

        document.body.style.backgroundImage = "url('https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?w=2000')";

        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Notes/>
        </div>
    )
}

export default Home;