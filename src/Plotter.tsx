import React from 'react'
import Axes from './Axes'

import './Plotter.css'


export interface SpaceVector {
    x : number
    y : number
}

interface Props {
    width : number
    height : number
    points : SpaceVector[]
    scale :  SpaceVector
    color? : string
    strokeWidth? : string
}


interface DragState {
    drag : boolean
    startCoord : SpaceVector 
}


export const mapCoordinatesToView = ( args : {origin : SpaceVector, point : SpaceVector,scale : SpaceVector, viewDimensions : SpaceVector} ) => ({

    x : args.origin.x + args.point.x * args.scale.x,

    y : args.viewDimensions.y - args.point.y*args.scale.y - args.origin.y,

})


export const Plotter : React.FC<Props> = (props : Props) => {
    
    
    const HOME_ORIGIN : SpaceVector = {x : props.width/2 , y: props.height/2}

    const [origin,setOrigin] = React.useState<SpaceVector>(HOME_ORIGIN)

    const [dragState,setDragState] = React.useState<DragState>({
        drag:false,
        startCoord: {x:0,y:0}
    })


    const plotPathString  = () => {

        const { points , scale } = props

        let svgCoord : SpaceVector,
            res : string = ''


        for (let i = 0;i < points.length; i++){

            svgCoord = mapCoordinatesToView({
                
                origin : origin,

                viewDimensions : { x : props.width, y : props.height },

                point : points[i],

                scale : scale

                
            })


            if (i===0)
                res+=`M ${svgCoord.x} ${svgCoord.y} `
            else
                res+=`L ${svgCoord.x} ${svgCoord.y} `

        }
        

        return res;
    }


    const handleMouseDown = (e: any) => {
        setDragState({
           drag:true,
            startCoord : {x:e.clientX,y:e.clientY}
        })
    }

    const handleDrag = (e:any) => {

        if (dragState.drag){

            setOrigin({
                x : origin.x + (e.clientX - dragState.startCoord.x) , 
                y: origin.y - (e.clientY - dragState.startCoord.y) 
            })

            setDragState({
               drag:true,
                startCoord : {x:e.clientX,y:e.clientY}
            })
        }
    }



    return (
        <>
            <svg 
                onMouseDown={handleMouseDown} 

                onMouseUp={()=>{
                    setDragState({
                        drag:false,
                        startCoord:{x:0,y:0}
                    })
                }} 

                onScroll={(e)=>{
                    console.log(e)
                }}

                onMouseMove={handleDrag} 

                className='Plotter' 

                width={props.width} 

                height={props.height}
            >

            <rect x='0' y='0' stroke='white' fill='none' width={props.width}  height={props.height}/>

            <path stroke-width={props.strokeWidth || '2px'} d={plotPathString()} fill='none' stroke={props.color || 'white'}/>

            <Axes/>

            </svg>
            <button onClick={()=>{ setOrigin(HOME_ORIGIN) }} className='Plotter' > reset </button>
        </>
        )
}

