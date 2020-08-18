import React from 'react';
import './Timer.css';

class Timer extends React.Component{
    constructor(props){
        super(props);

        this.displayRef = React.createRef();
        this.repsRef = React.createRef();

        const { contract, rest, reps, texts } = props;

        this.SFX_CD = new Audio("/audio/countdown1.mp3");
        this.SFX_ON = new Audio("/audio/on1.mp3");
        this.SFX_OFF = new Audio("/audio/off1.mp3");
        this.SFX_END = new Audio("/audio/finish1.mp3");

        this.totaltime = (contract + rest) * reps;

        this.state = {
            display: texts.start_msg,
            r: reps,
            c: 0,
            intervalId: ''
        }

        this.renderRepsDivs = this.renderRepsDivs.bind(this);
        this.handleStartButton = this.handleStartButton.bind(this);
        this.handleStopButton = this.handleStopButton.bind(this);
        this.init = this.init.bind(this);
        this.on = this.on.bind(this);
        this.off = this.off.bind(this);
        this.end = this.end.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        const { index, contract, rest, reps, texts } = this.props;

        //Si hay cambio de ejercicio...
        if(index !== prevProps.index){
            //Limpia el timer si lo hubiera y los estilos (rep)
            if(prevState.intervalId != '') clearInterval(prevState.intervalId);

            //UX
            this.displayRef.current.style.backgroundColor = 'whitesmoke';
            this.displayRef.current.style.color = 'black';
            this.displayRef.current.style.fontSize = '24px';
            for(let i=0; i<reps; i++)
                this.repsRef.current.children[i].style.backgroundColor = 'red';
                
            //Reinicio estado (initial)
            this.totaltime = (contract + rest) * reps;
            this.setState({
                display: texts.start_msg,
                r: reps,
                c: 0,
                intervalId: ''
            });
        }

        if(prevProps.texts !== texts) this.setState({ display: texts.start_msg });
    }

    componentWillUnmount() {
        if(this.state.intervalId != '') 
            clearInterval(this.state.intervalId);
    }

    handleStartButton(){
        const { intervalId } = this.state;
        const { reps } = this.props;

        //Paro el timer si está funcionando y seteo nuevo timer
        if(intervalId != '') clearInterval(intervalId);
        let id = setInterval(this.init, 1000);

        //UX (cd)
        for(let i=0; i<this.props.reps; i++)
            this.repsRef.current.children[i].style.backgroundColor = 'red';
        this.displayRef.current.style.backgroundColor = 'yellow';
        this.displayRef.current.style.color = 'black';
        this.displayRef.current.style.fontSize = '42px';
        this.SFX_CD.play();

        //Inicializo el estado
        this.setState({
            display: 3,
            c: 3,
            r: reps,
            intervalId: id,
        });
    }

    handleStopButton(){
        const { intervalId } = this.state;
        const { reps, texts } = this.props;

        //Paro el timer si está funcionando y reinicio reps en ese caso
        if(intervalId != ''){
            clearInterval(intervalId);
            for(let i=0; i<reps; i++)
                this.repsRef.current.children[i].style.backgroundColor = 'red';
        }

        //UX initial
        this.displayRef.current.style.backgroundColor = 'whitesmoke';
        this.displayRef.current.style.color = 'black';
        this.displayRef.current.style.fontSize = '24px';
        this.SFX_END.play();

        //Reinicio el estado
        this.setState({
            display: texts.start_msg,
            r: reps,
            intervalId: ''
        });
    }

    init(){
        let { c, intervalId } = this.state;

        //Si c > 1, c-- && SFX_CD
        if(c > 1){
            this.setState({ c: c - 1, display: c - 1 });
            this.SFX_CD.play();
        }

        //Si (c = 1) => on()
        else{
            //UX (on)
            this.displayRef.current.style.backgroundColor = 'red';
            this.displayRef.current.style.color = 'white';
            this.SFX_ON.play();

            //Paro timer(init) e inicio timer(on)
            clearInterval(intervalId);
            let id = setInterval(this.on, 1000);

            //Inicio ejercicio
            this.setState({
                display: this.totaltime,
                c: this.totaltime,
                intervalId: id
            });
        }
    }

    on(){
        const { c, r, intervalId } = this.state;
        const { contract, rest, reps } = this.props;
        let timeToOff = c - ((r * (contract + rest)) - contract);

        if(timeToOff <= 1){
            //Paro timer(on) e inicio timer(off)
            clearInterval(intervalId);
            let id = setInterval(this.off, 1000);

            //UX
            let repKey = reps - r;
            this.repsRef.current.children[repKey].style.backgroundColor = 'green';
            this.displayRef.current.style.backgroundColor = 'green';
            this.displayRef.current.style.color = 'white';
            this.SFX_OFF.play();

            //Actualizo el estado
            this.setState({
                r: r - 1,
                intervalId: id,
                c: c - 1, 
                display: c - 1
            });
        }else{
            //Cuenta regresiva
            this.setState({ c: c - 1, display: c - 1 });
        }
    }

    off(){
        const { contract, rest, texts } = this.props;
        const { c, r, intervalId } = this.state;
        let timeToOn = c - (r * (contract + rest));

        //UX (cd)
        if((timeToOn == 4) && (r > 0)){
            this.displayRef.current.style.backgroundColor = 'yellow';
            this.displayRef.current.style.color = 'black';
        }
        if((contract > 3) && (r > 0) && ((timeToOn <= 4) && (timeToOn > 1))) 
            this.SFX_CD.play();


        //Si todavía queda tiempo de descanso...
        if(timeToOn > 1){
            this.setState({ c: c - 1, display: c - 1 });
        }

        //Si el tiempo de descanso se acabó, compruebo si queda ejercicio por hacer
        else{
            //Paro timer (off)
            clearInterval(intervalId);

            //Si todavía queda cuenta del total...
            if((c-1) > 0){
                //Inicio timer (on)
                let id = setInterval(this.on, 1000);

                //UX
                this.displayRef.current.style.backgroundColor = 'red';
                this.displayRef.current.style.color = 'white';
                this.SFX_ON.play();

                //Actualizo estado
                this.setState({
                    c: c - 1,
                    display: c - 1,
                    intervalId: id
                });
                
            }

            //Si se acabó el ejercicio, cambio estilos (end)
            else{
                //Inicio timer (end)
                let id = setInterval(this.end, 5000);

                //UX (end)
                this.displayRef.current.style.backgroundColor = 'red';
                this.displayRef.current.style.color = 'white';
                this.SFX_END.play();

                //Actualizo el estado
                this.setState({
                    display: texts.end_msg,
                    c: 0,
                    intervalId: id
                });
            }
        }
    }

    end(){
        const { reps, texts } = this.props;

        //Paro el timer
        clearInterval(this.state.intervalId);

        //UX (initial)
        this.displayRef.current.style.backgroundColor = 'whitesmoke';
        this.displayRef.current.style.color = 'black';
        this.displayRef.current.style.fontSize = '24px';

        //Reinicio el estado (initial)
        this.setState({
            display: texts.start_msg,
            r: reps,
            intervalId: ''
        });
    }

    renderRepsDivs(){
        let divs = [];
        for(let i=0; i<this.props.reps; i++) divs.push(i);
        return divs.map((i) => <div style={{ backgroundColor: 'red' }} key={i}></div>);
    }

    render(){
        const { display } = this.state;
        const { contract, rest, reps, texts } = this.props;

        return (
            <div className="Timer">
                <div className="display" ref={this.displayRef}> 
                    {display}
                </div>
                <div className="reps" ref={this.repsRef}>
                    {this.renderRepsDivs()}
                </div>
                <div className="info">
                    {`${texts.contract} ${contract}s, ${texts.rest} ${rest}s, ${texts.totalrep} ${reps}`}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <button className="start" onClick={this.handleStartButton}>{texts.start}</button>
                    <button className="stop" onClick={this.handleStopButton}>{texts.stop}</button>
                </div>
            </div>
        );
    }
}

export default Timer;