import React, { useEffect, useRef, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

import './tailwind-config.js'

export default function App() {
  const canvasRef = useRef(null)
  const [positionData, setPositionData] = useState([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let x = 50
    let y = 50
    let dx = 5
    let dy = 2
    let radius = 20
    let gravity = 1

    function animate() {
      requestAnimationFrame(animate)
      context.clearRect(0, 0, canvas.width, canvas.height)

      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2, false)
      context.fillStyle = 'blue'
      context.fill()
      context.closePath()

      if (x + dx > canvas.width - radius || x + dx < radius) {
        dx = -dx
      }

      if (y + dy > canvas.height - radius || y + dy < radius) {
        dy = -dy * 0.8; // Add gravity effect to the vertical movement
      } else {
        dy += gravity; // Apply gravity force
      }

      x += dx
      y += dy
      
      setPositionData(prevData => [...prevData, { x, y }])
    }

    animate()
  }, [])

  const resetSimulation = () => {
    setPositionData([])
  }

  return (
    <div className="p-2 w-full">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
        My Physics Simulation
      </h1>
      <canvas ref={canvasRef} width={400} height={200} />
      <div className="mt-4">
        <LineChart width={600} width={400} height={200} data={positionData}>
          <Line type="monotone" dataKey="x" stroke="#8884d8" />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="index" />
          <YAxis />
        </LineChart>
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetSimulation}>
        Reset Simulation
      </button>
    </div>
  )
}