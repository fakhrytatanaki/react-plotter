import React from 'react';
import './App.css';
import {Plotter,SpaceVector} from './Plotter'



const scale : SpaceVector  = {x:20,y:20}

const trigEq = () => {

    let res : SpaceVector[] = [],
        x:number,
        y:number

    for (let i=0;i < 4*Math.PI ; i+=0.02){
        x = 4*Math.cos(i) + Math.sin(20*i)
        y = 4*Math.sin(i) + Math.cos(20*i)
        res.push({x:x,y:y})
    }
     return res
}

const App : React.FC = () => (
    <>
    <h1>
        Simple Plotter
    </h1>
        <Plotter color='#6688ff' width={700} height={700} points={trigEq()} scale={scale} />
    </>
)



export default App;

