import "./App.css";
import { Biscuits, JaffaCakes } from "./components/AllLists";
import Title from "./components/Title";
import ListRenderer from "./components/ListsFunc";
import Quiz from "./components/Quiz";


function App() {
    return (
        <div className="App App-background">
            <u><Title text="Phoebe's Page" size="h1" /></u>
            <p>Here is a page dedicated to Biscuits.</p>
            <Title text="Biscuits and how I rate them:" />
            <Biscuits></Biscuits>
            <p>As you can see, Jaffa cakes are on this list...</p>
            <p className="App-imposter" > <b>They are an IMPOSTER!!!!</b></p>
            <p>Jaffa cakes are actually cakes... hence the name Jaffa<b>Cake</b> </p>

            <Title text="Jaffa Cake Lawsuit" />
            <p>There was actually a lawsuit in 1991 over whether Jaffa Cakes were a biscuit or cake. This was to do with the VAT you pay on cakes VS Biscuits. It was a long dispute however McVitie's won and Jaffa cakes were ruled as cakes, not biscuits.</p>
            <JaffaCakes></JaffaCakes>
            <header className="App-header">
                <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/26/13/pa-9804902.jpg" width="400" />
                <a className="App-link" href="https://www.astonshaw.co.uk/jaffa-cake-tax/" target="_blank" rel="noopener noreferrer">
                    Jaffa Cake Lawsuit
                </a>
            </header>
            <Quiz></Quiz>
        </div>

    );
}

export default App;
