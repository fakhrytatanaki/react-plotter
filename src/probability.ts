

export const cart = <T> (syms:T[],deg:number)=>{


    if (deg===0 || syms.length===0)
        return []
    
    if (deg===1)
        return syms.map(x => [x])

    let u:T[][] = syms.map(x => [x])

    let w:T[][] = []

    while (--deg > 0){

        w = []

        for (let x of u){
            for (let y of syms)
                w.push(x.concat(y))
        }

        u = w

    }

    return w

}

export const avg = (sa : number[])=>{

    let sum = 0

    for (let n of sa)
        sum+=n

    return sum/sa.length
    
}


    
export const dist = <T> (space : T[][], evFunc : (arg0:T[])=>number ) => {

    let res : [number,number][] = []

    let avgArr = space.map(x => evFunc(x)).sort((a,b)=>(a-b))

    let count = 0,
        last = 0,
        i = 0

    while (++i < avgArr.length){


        last = avgArr[i-1]
        count++


        if (avgArr[i]!==last){
            res.push([last,count])
            count=0
        }

        
    }

    return res

}


//console.log(
//    dist<number>(
//        cart<number>([1,2,3,4,5,6],2),
//        avg
//    )
//)






