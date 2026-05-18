import { useState, useRef, useEffect } from 'react'

const zones16 = [
  { id: 0, dir: 'N', name: 'North', deity: 'Kubera', benefit: 'Finance & Prosperity', element: 'Water', color: '#3B82F6', angle: 0 },
  { id: 1, dir: 'NNE', name: 'North-Northeast', deity: 'Soma', benefit: 'Health & Immunity', element: 'Water', color: '#6366F1', angle: 22.5 },
  { id: 2, dir: 'NE', name: 'Northeast', deity: 'Ishanya', benefit: 'Knowledge & Wisdom', element: 'Space', color: '#8B5CF6', angle: 45 },
  { id: 3, dir: 'ENE', name: 'East-Northeast', deity: 'Surya', benefit: 'Light & Energy', element: 'Fire', color: '#F59E0B', angle: 67.5 },
  { id: 4, dir: 'E', name: 'East', deity: 'Indra', benefit: 'Power & Success', element: 'Air', color: '#10B981', angle: 90 },
  { id: 5, dir: 'ESE', name: 'East-Southeast', deity: 'Agni', benefit: 'Social Life', element: 'Fire', color: '#34D399', angle: 112.5 },
  { id: 6, dir: 'SE', name: 'Southeast', deity: 'Agni', benefit: 'Kitchen & Energy', element: 'Fire', color: '#EF4444', angle: 135 },
  { id: 7, dir: 'SSE', name: 'South-Southeast', deity: 'Yama', benefit: 'Disposal & Cleansing', element: 'Earth', color: '#F97316', angle: 157.5 },
  { id: 8, dir: 'S', name: 'South', deity: 'Yama', benefit: 'Rest & Sleep', element: 'Earth', color: '#374151', angle: 180 },
  { id: 9, dir: 'SSW', name: 'South-Southwest', deity: 'Niriti', benefit: 'Disposal of Waste', element: 'Earth', color: '#7C3AED', angle: 202.5 },
  { id: 10, dir: 'SW', name: 'Southwest', deity: 'Pitru', benefit: 'Stability & Strength', element: 'Earth', color: '#D97706', angle: 225 },
  { id: 11, dir: 'WSW', name: 'West-Southwest', deity: 'Varuna', benefit: 'Education & Savings', element: 'Water', color: '#059669', angle: 247.5 },
  { id: 12, dir: 'W', name: 'West', deity: 'Varuna', benefit: 'Profits & Gains', element: 'Air', color: '#2563EB', angle: 270 },
  { id: 13, dir: 'WNW', name: 'West-Northwest', deity: 'Vayu', benefit: 'Banking & Cash Flow', element: 'Air', color: '#7C3AED', angle: 292.5 },
  { id: 14, dir: 'NW', name: 'Northwest', deity: 'Vayu', benefit: 'Support & Networking', element: 'Air', color: '#0891B2', angle: 315 },
  { id: 15, dir: 'NNW', name: 'North-Northwest', deity: 'Kubera', benefit: 'Wealth & Abundance', element: 'Water', color: '#065F46', angle: 337.5 },
]

const zones32 = [
  { id: 0, name: 'Shikhi', dir: 'S', color: '#374151' },
  { id: 1, name: 'Parjanya', dir: 'SSE', color: '#4B5563' },
  { id: 2, name: 'Jayanta', dir: 'SSE', color: '#EF4444' },
  { id: 3, name: 'Indra', dir: 'SE', color: '#DC2626' },
  { id: 4, name: 'Surya', dir: 'ESE', color: '#F59E0B' },
  { id: 5, name: 'Satya', dir: 'ESE', color: '#D97706' },
  { id: 6, name: 'Bhrisha', dir: 'E', color: '#10B981' },
  { id: 7, name: 'Antariksha', dir: 'ENE', color: '#059669' },
  { id: 8, name: 'Anila', dir: 'ENE', color: '#34D399' },
  { id: 9, name: 'Pusha', dir: 'NE', color: '#8B5CF6' },
  { id: 10, name: 'Vitatha', dir: 'NNE', color: '#7C3AED' },
  { id: 11, name: 'Grihakshat', dir: 'NNE', color: '#6D28D9' },
  { id: 12, name: 'Yama', dir: 'N', color: '#3B82F6' },
  { id: 13, name: 'Gandharva', dir: 'NNW', color: '#2563EB' },
  { id: 14, name: 'Bhringraj', dir: 'NNW', color: '#1D4ED8' },
  { id: 15, name: 'Mriga', dir: 'NW', color: '#0891B2' },
  { id: 16, name: 'Pitru', dir: 'WNW', color: '#0E7490' },
  { id: 17, name: 'Dauvarika', dir: 'WNW', color: '#065F46' },
  { id: 18, name: 'Sugriva', dir: 'W', color: '#059669' },
  { id: 19, name: 'Pushpadanta', dir: 'WSW', color: '#D97706' },
  { id: 20, name: 'Varuna', dir: 'WSW', color: '#B45309' },
  { id: 21, name: 'Asura', dir: 'SW', color: '#92400E' },
  { id: 22, name: 'Shosha', dir: 'SSW', color: '#7C3AED' },
  { id: 23, name: 'Papayakshma', dir: 'SSW', color: '#6D28D9' },
  { id: 24, name: 'Roga', dir: 'S', color: '#374151' },
  { id: 25, name: 'Naga', dir: 'SSE', color: '#1F2937' },
  { id: 26, name: 'Mukhya', dir: 'SE', color: '#EF4444' },
  { id: 27, name: 'Bhallata', dir: 'ESE', color: '#DC2626' },
  { id: 28, name: 'Soma', dir: 'E', color: '#F59E0B' },
  { id: 29, name: 'Bhujaga', dir: 'ENE', color: '#10B981' },
  { id: 30, name: 'Aditi', dir: 'NE', color: '#8B5CF6' },
  { id: 31, name: 'Diti', dir: 'NW', color: '#0891B2' },
]

const toRad = deg => (deg * Math.PI) / 180

function polarToCart(cx, cy, r, angleDeg) {
  const rad = toRad(angleDeg - 90)
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function makeSlicePath(cx, cy, r1, r2, startAngle, endAngle) {
  const s1 = polarToCart(cx, cy, r1, startAngle)
  const s2 = polarToCart(cx, cy, r2, startAngle)
  const e1 = polarToCart(cx, cy, r1, endAngle)
  const e2 = polarToCart(cx, cy, r2, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${s2.x} ${s2.y} A ${r2} ${r2} 0 ${largeArc} 1 ${e2.x} ${e2.y} L ${e1.x} ${e1.y} A ${r1} ${r1} 0 ${largeArc} 0 ${s1.x} ${s1.y} Z`
}

export default function VastuCompass() {
  const [mode, setMode] = useState('16')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [compassDir, setCompassDir] = useState(0)
  const [gyroActive, setGyroActive] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const svgRef = useRef(null)
  const lastAngleRef = useRef(null)
  const rotationRef = useRef(0)

  const cx = 200, cy = 200, outerR = 160, innerR = 85
  const zones = mode === '16' ? zones16 : zones32
  const sliceAngle = mode === '16' ? 22.5 : 11.25

  useEffect(() => {
    const normalized = ((rotation % 360) + 360) % 360
    const nearest45 = (Math.round(normalized / 45) * 45) % 360
     
    setCompassDir(nearest45)
  }, [rotation])

  const getAngleFromCenter = (clientX, clientY) => {
    const svg = svgRef.current
    if (!svg) return 0
    const rect = svg.getBoundingClientRect()
    const scaleX = 400 / rect.width
    const scaleY = 400 / rect.height
    const x = (clientX - rect.left) * scaleX - cx
    const y = (clientY - rect.top) * scaleY - cy
    return Math.atan2(y, x) * (180 / Math.PI)
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    lastAngleRef.current = getAngleFromCenter(e.clientX, e.clientY)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e) => {
    if (!isDragging) return
    const angle = getAngleFromCenter(e.clientX, e.clientY)
    const delta = angle - lastAngleRef.current
    lastAngleRef.current = angle
    rotationRef.current = (rotationRef.current + delta + 360) % 360
    setRotation(rotationRef.current)
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    lastAngleRef.current = getAngleFromCenter(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const angle = getAngleFromCenter(touch.clientX, touch.clientY)
    const delta = angle - lastAngleRef.current
    lastAngleRef.current = angle
    rotationRef.current = (rotationRef.current + delta + 360) % 360
    setRotation(rotationRef.current)
  }

  const handleTouchEnd = () => setIsDragging(false)

  const enableGyro = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      const permission = await DeviceOrientationEvent.requestPermission()
      if (permission !== 'granted') return
    }
    setGyroActive(true)
    window.addEventListener('deviceorientation', handleGyro)
  }

  const handleGyro = (e) => {
    if (e.alpha !== null) {
      rotationRef.current = e.alpha
      setRotation(e.alpha)
    }
  }

  const disableGyro = () => {
    setGyroActive(false)
    window.removeEventListener('deviceorientation', handleGyro)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('deviceorientation', handleGyro)
    }
  }, [handleMouseMove, isDragging])

  const getActiveZone = () => {
    const normalizedRot = ((rotation % 360) + 360) % 360
    const zoneIndex = Math.round(normalizedRot / sliceAngle) % zones.length
    return zones[zoneIndex]
  }

  const activeZone = getActiveZone()

  const resetCompass = () => {
    rotationRef.current = 0
    setRotation(0)
  }

  const facingLabel =
    compassDir === 0 ? 'North' :
    compassDir === 45 ? 'Northeast' :
    compassDir === 90 ? 'East' :
    compassDir === 135 ? 'Southeast' :
    compassDir === 180 ? 'South' :
    compassDir === 225 ? 'Southwest' :
    compassDir === 270 ? 'West' : 'Northwest'

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-700 opacity-20 rounded-full blur-3xl"></div>

        {/* Small Hero Compass */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 relative">
            <span className="absolute top-1 text-xs font-black text-yellow-300">N</span>
            <span className="absolute bottom-1 text-xs font-black text-white">S</span>
            <span className="absolute right-2 text-xs font-black text-white">E</span>
            <span className="absolute left-2 text-xs font-black text-white">W</span>

            {/* Degree ring dots */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
              const rad = (deg - 90) * Math.PI / 180
              const x = 50 + 42 * Math.cos(rad)
              const y = 50 + 42 * Math.sin(rad)
              return (
                <div
                  key={deg}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-60"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                />
              )
            })}

            {/* Needle */}
            <div
              className="flex flex-col items-center"
              style={{
                transform: `rotate(${compassDir}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* North needle - red */}
              <div style={{
                width: 0, height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderBottom: '40px solid #EF4444',
              }} />
              {/* Center dot */}
              <div className="w-3 h-3 rounded-full bg-white border-2 border-gray-300 -my-1.5 z-10" />
              {/* South needle - gray */}
              <div style={{
                width: 0, height: 0,
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '40px solid #9CA3AF',
              }} />
            </div>
          </div>
        </div>

        {/* Rotate button */}
        <button
          onClick={() => {
            const next = (rotation + 45) % 360
            rotationRef.current = next
            setRotation(next)
          }}
          className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full hover:bg-yellow-300 transition shadow-lg whitespace-nowrap mb-6"
        >
          <i className="fa-solid fa-rotate-right mr-1"></i>Rotate
        </button>

        <h1 className="text-4xl font-black mb-2">Vastu Consultancy</h1>
        <p className="text-orange-100 text-lg max-w-xl mx-auto">
          Ancient science of architecture for harmony, prosperity &amp; positive energy
        </p>

        {/* Direction indicator */}
        <div className="mt-4 inline-block bg-white bg-opacity-20 px-4 py-1.5 rounded-full text-sm font-semibold">
          <i className="fa-solid fa-compass mr-2 text-yellow-300"></i>
          Facing: {facingLabel}
        </div>
      </div>
      {/* End Hero Section */}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 items-start p-6">

        {/* Left: Compass */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          {/* Controls */}
          <div className="flex gap-2 mb-4 justify-center flex-wrap">
            {['16', '32'].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setSelected(null); setHovered(null) }}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition ${
                  mode === m
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {m} Zones
              </button>
            ))}
            <button
              onClick={resetCompass}
              className="px-4 py-2 rounded-xl font-bold text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <i className="fa-solid fa-rotate-right mr-1"></i>Reset
            </button>
            <button
              onClick={gyroActive ? disableGyro : enableGyro}
              className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                gyroActive
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className="fa-solid fa-mobile-screen mr-1"></i>
              {gyroActive ? 'Gyro ON' : 'Gyro'}
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mb-2">
            <i className="fa-solid fa-hand-pointer mr-1"></i>
            Drag to rotate compass · Tap zones for details
          </p>

          {/* SVG Compass */}
          <div className="relative">
            <svg
              ref={svgRef}
              width="400"
              height="400"
              viewBox="0 0 400 400"
              className={`w-full max-w-sm mx-auto select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'none' }}
            >
              {/* Background */}
              <circle cx={cx} cy={cy} r={outerR + 25} fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx={cx} cy={cy} r={outerR + 25} fill="none" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />

              {/* Rotating group */}
              <g
                transform={`rotate(${rotation}, ${cx}, ${cy})`}
                style={{ transition: isDragging ? 'none' : 'transform 0.1s ease' }}
              >
                {/* Slices */}
                {zones.map((zone, i) => {
                  const startAngle = i * sliceAngle
                  const endAngle = startAngle + sliceAngle
                  const isHovered = hovered === i
                  const isSelected = selected?.id === i
                  const r2 = isHovered || isSelected ? outerR + 6 : outerR

                  return (
                    <g
                      key={i}
                      onMouseEnter={(e) => { e.stopPropagation(); if (!isDragging) setHovered(i) }}
                      onMouseLeave={() => setHovered(null)}
                      onClick={(e) => {
                        e.stopPropagation()
                        if (!isDragging) setSelected(isSelected ? null : { ...zone, id: i })
                      }}
                      style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
                    >
                      <path
                        d={makeSlicePath(cx, cy, innerR, r2, startAngle, endAngle)}
                        fill={zone.color}
                        opacity={isSelected ? 1 : isHovered ? 0.92 : 0.78}
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      {(() => {
                        const midAngle = startAngle + sliceAngle / 2
                        const labelR = (innerR + outerR) / 2
                        const pos = polarToCart(cx, cy, labelR, midAngle)
                        const fontSize = mode === '32' ? 6 : 9
                        const label =
                          mode === '16'
                            ? zone.dir
                            : zone.name.length > 8
                            ? zone.name.substring(0, 7) + '.'
                            : zone.name
                        return (
                          <text
                            x={pos.x}
                            y={pos.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="white"
                            fontSize={fontSize}
                            fontWeight="700"
                            style={{ pointerEvents: 'none', userSelect: 'none' }}
                            transform={`rotate(${midAngle}, ${pos.x}, ${pos.y})`}
                          >
                            {label}
                          </text>
                        )
                      })()}
                    </g>
                  )
                })}

                {/* Inner circle */}
                <circle cx={cx} cy={cy} r={innerR} fill="white" stroke="#e5e7eb" strokeWidth="2" />
                <circle cx={cx} cy={cy} r={innerR - 5} fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />

                {/* Compass lines inside */}
                {[0, 45, 90, 135].map(angle => {
                  const p1 = polarToCart(cx, cy, 20, angle)
                  const p2 = polarToCart(cx, cy, innerR - 8, angle)
                  const p3 = polarToCart(cx, cy, 20, angle + 180)
                  const p4 = polarToCart(cx, cy, innerR - 8, angle + 180)
                  return (
                    <g key={angle}>
                      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
                      <line x1={p3.x} y1={p3.y} x2={p4.x} y2={p4.y} stroke="#d97706" strokeWidth="0.8" opacity="0.4" />
                    </g>
                  )
                })}
              </g>

              {/* Fixed compass needle */}
              <polygon points={`${cx},${cy - 55} ${cx - 7},${cy} ${cx},${cy - 20}`} fill="#EF4444" />
              <polygon points={`${cx},${cy + 55} ${cx - 7},${cy} ${cx},${cy + 20}`} fill="#9CA3AF" />
              <polygon points={`${cx},${cy - 55} ${cx + 7},${cy} ${cx},${cy - 20}`} fill="#DC2626" />
              <polygon points={`${cx},${cy + 55} ${cx + 7},${cy} ${cx},${cy + 20}`} fill="#6B7280" />
              <circle cx={cx} cy={cy} r={10} fill="#1F2937" />
              <circle cx={cx} cy={cy} r={5} fill="#F59E0B" />

              {/* Fixed N S E W labels */}
              {[
                { label: 'N', angle: 0, color: '#3B82F6' },
                { label: 'S', angle: 180, color: '#EF4444' },
                { label: 'E', angle: 90, color: '#10B981' },
                { label: 'W', angle: 270, color: '#7C3AED' },
              ].map(({ label, angle, color }) => {
                const pos = polarToCart(cx, cy, outerR + 18, angle)
                return (
                  <text
                    key={label}
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={color}
                    fontSize="16"
                    fontWeight="900"
                    style={{ userSelect: 'none' }}
                  >
                    {label}
                  </text>
                )
              })}

              {/* North indicator triangle */}
              <polygon
                points={`${cx},${cy - outerR - 5} ${cx - 6},${cy - outerR + 8} ${cx + 6},${cy - outerR + 8}`}
                fill="#EF4444"
                opacity="0.9"
              />
            </svg>

            {/* Rotation display */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded-full">
              {Math.round(rotation % 360)}°
            </div>
          </div>

          {/* Active zone indicator */}
          {activeZone && (
            <div className="mt-2 mx-auto max-w-sm bg-white rounded-xl shadow-sm p-3 flex items-center gap-3 border border-orange-100">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
                style={{ background: activeZone.color }}
              >
                {mode === '16' ? activeZone.dir : (activeZone.id + 1)}
              </div>
              <div>
                <p className="text-xs text-gray-400">Currently pointing North</p>
                <p className="font-bold text-gray-800 text-sm">{activeZone.name}</p>
              </div>
            </div>
          )}
        </div>
        {/* End Left: Compass */}

        {/* Right: Info Panel */}
        <div className="flex-1 min-w-0">
          {selected ? (
            <div
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4"
              style={{ borderColor: zones[selected.id]?.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg"
                  style={{ background: zones[selected.id]?.color }}
                >
                  {mode === '16' ? selected.dir : (selected.id + 1)}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 text-xl">{selected.name}</h3>
                  {mode === '16' && <p className="text-gray-500 text-sm">{selected.dir} Direction</p>}
                </div>
              </div>

              {mode === '16' && (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Ruling Deity</p>
                    <p className="font-bold text-gray-800">{selected.deity}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Key Benefit</p>
                    <p className="font-bold text-gray-800">{selected.benefit}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Element</p>
                    <p className="font-bold text-gray-800">{selected.element}</p>
                  </div>
                </div>
              )}

              {mode === '32' && (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Zone Number</p>
                    <p className="font-bold text-gray-800">Pada {selected.id + 1} of 32</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Direction</p>
                    <p className="font-bold text-gray-800">{selected.dir}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3">
                    <p className="text-xs text-orange-600 font-semibold">Book a consultation for detailed Pada analysis</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelected(null)}
                className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition flex items-center gap-1"
              >
                <i className="fa-solid fa-xmark"></i> Close
              </button>
            </div>
          ) : hovered !== null ? (
            <div
              className="bg-white rounded-2xl shadow-md p-5 border-l-4"
              style={{ borderColor: zones[hovered]?.color }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                  style={{ background: zones[hovered]?.color }}
                >
                  {mode === '16' ? zones[hovered].dir : (hovered + 1)}
                </div>
                <div>
                  <p className="font-black text-gray-800">{zones[hovered].name}</p>
                  {mode === '16' && <p className="text-xs text-gray-500">{zones[hovered].benefit}</p>}
                  {mode === '32' && <p className="text-xs text-gray-500">Pada {hovered + 1} · {zones[hovered].dir}</p>}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                <i className="fa-solid fa-hand-pointer mr-1"></i>Click for full details
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <div className="text-5xl mb-4">🧭</div>
              <h3 className="font-black text-gray-800 text-lg mb-2">Interactive Vastu Compass</h3>
              <div className="space-y-2 text-sm text-gray-500 text-left bg-orange-50 rounded-xl p-4 mb-4">
                <p><i className="fa-solid fa-computer-mouse mr-2 text-orange-500"></i><strong>Desktop:</strong> Click &amp; drag to rotate</p>
                <p><i className="fa-solid fa-hand-back-fist mr-2 text-orange-500"></i><strong>Mobile:</strong> Touch &amp; drag to rotate</p>
                <p><i className="fa-solid fa-mobile-screen mr-2 text-orange-500"></i><strong>Gyroscope:</strong> Tap Gyro button to use phone sensor</p>
                <p><i className="fa-solid fa-hand-pointer mr-2 text-orange-500"></i><strong>Zones:</strong> Click any zone for details</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left">
                {[
                  { color: '#3B82F6', label: 'North — Finance' },
                  { color: '#8B5CF6', label: 'Northeast — Knowledge' },
                  { color: '#10B981', label: 'East — Success' },
                  { color: '#EF4444', label: 'Southeast — Energy' },
                  { color: '#374151', label: 'South — Rest' },
                  { color: '#D97706', label: 'Southwest — Stability' },
                  { color: '#2563EB', label: 'West — Profits' },
                  { color: '#0891B2', label: 'Northwest — Support' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }}></div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All zones list */}
          {mode === '16' && (
            <div className="mt-4 bg-white rounded-2xl shadow-sm p-4 max-h-64 overflow-y-auto">
              <p className="text-sm font-bold text-gray-700 mb-3">All 16 Zones</p>
              <div className="space-y-1">
                {zones16.map((z, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected({ ...z, id: i })}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition text-sm ${
                      selected?.id === i ? 'bg-orange-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: z.color }}></div>
                    <span className="font-semibold text-gray-700 w-10">{z.dir}</span>
                    <span className="text-gray-500 text-xs">{z.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* End Right: Info Panel */}

      </div>
      {/* End Main Content */}

    </div>
  )
}
