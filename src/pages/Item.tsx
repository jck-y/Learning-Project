import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

function Item() {
    const data = [
        { x: 4, y:10 },
        { x: 5, y:9 },
        { x: 6, y:8 },
        { x: 7, y:7 },
        { x: 8, y:6 },
    ]
    const m = -1;
    const b = 14;

    const lineData = data.map((point)=>({
        x: point.x,
        y: m * point.x + b,
    }))
    return (
        <div>
            <h1>Regresi Linear - by jos</h1>
            <ScatterChart width={400} height={300}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="x"/>
                <YAxis type="number" dataKey="y"/>

                <Tooltip/>
                <Scatter data={data} fill="blue"/>
                <Scatter data={lineData} line shape="none" fill="red"/>
            </ScatterChart>
        </div>
    )                        
}
export default Item