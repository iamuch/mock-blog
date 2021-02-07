export default function ScrollTop() {
    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div className="App-scroll-top" onClick={scrollTop}>
            <span><i className="arrow up"></i></span>
            <span>TOP</span>
        </div>
    )
}