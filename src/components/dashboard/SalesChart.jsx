import { useEffect, useRef } from 'react'
import '../../styles/dashboard/SalesChart.css'

const monthlyData = [
  { month: 'جان', sales: 85000  },
  { month: 'فيف', sales: 112000 },
  { month: 'مار', sales: 98000  },
  { month: 'أفر', sales: 134000 },
  { month: 'ماي', sales: 110000 },
  { month: 'جوان',sales: 125000 },
  { month: 'جوي', sales: 145000 },
  { month: 'أوت', sales: 138000 },
  { month: 'سبت', sales: 162000 },
  { month: 'أكت', sales: 149000 },
  { month: 'نوف', sales: 178000 },
  { month: 'ديس', sales: 195000 },
]

function formatShort(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`
  return n
}

function SalesChart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const W = rect.width
    const H = rect.height
    const padL = 48, padR = 20, padT = 20, padB = 40

    const values = monthlyData.map(d => d.sales)
    const maxVal  = Math.max(...values)
    const minVal  = 0

    const toX = i  => padL + (i / (monthlyData.length - 1)) * (W - padL - padR)
    const toY = v  => padT + (1 - (v - minVal) / (maxVal - minVal)) * (H - padT - padB)

    // Grid lines
    ctx.strokeStyle = '#f0ede8'
    ctx.lineWidth   = 1
    const steps = 4
    for (let i = 0; i <= steps; i++) {
      const y = padT + (i / steps) * (H - padT - padB)
      ctx.beginPath()
      ctx.moveTo(padL, y)
      ctx.lineTo(W - padR, y)
      ctx.stroke()

      // Y labels
      const val = maxVal - (i / steps) * maxVal
      ctx.fillStyle    = '#a8a29e'
      ctx.font         = '11px "Segoe UI", Arial, sans-serif'
      ctx.textAlign    = 'right'
      ctx.fillText(formatShort(val), padL - 6, y + 4)
    }

    // Gradient fill
    const grad = ctx.createLinearGradient(0, padT, 0, H - padB)
    grad.addColorStop(0,   'rgba(184,135,63,0.18)')
    grad.addColorStop(1,   'rgba(184,135,63,0)')

    ctx.beginPath()
    monthlyData.forEach((d, i) => {
      const x = toX(i), y = toY(d.sales)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.lineTo(toX(monthlyData.length - 1), H - padB)
    ctx.lineTo(toX(0), H - padB)
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    // Line
    ctx.beginPath()
    ctx.strokeStyle = '#b8873f'
    ctx.lineWidth   = 2.5
    ctx.lineJoin    = 'round'
    ctx.lineCap     = 'round'
    monthlyData.forEach((d, i) => {
      const x = toX(i), y = toY(d.sales)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()

    // Dots
    monthlyData.forEach((d, i) => {
      const x = toX(i), y = toY(d.sales)
      ctx.beginPath()
      ctx.arc(x, y, 3.5, 0, Math.PI * 2)
      ctx.fillStyle   = '#b8873f'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth   = 2
      ctx.stroke()
    })

    // X labels
    ctx.fillStyle = '#a8a29e'
    ctx.font      = '11px "Segoe UI", Arial, sans-serif'
    ctx.textAlign = 'center'
    monthlyData.forEach((d, i) => {
      ctx.fillText(d.month, toX(i), H - padB + 18)
    })
  }, [])

  return (
    <div className="sales-chart">
      <div className="sales-chart__header">
        <div>
          <h3 className="sales-chart__title">المبيعات الشهرية</h3>
          <p className="sales-chart__sub">إجمالي الإيرادات لعام 2026 بالدينار الجزائري</p>
        </div>
        <div className="sales-chart__badge">2026</div>
      </div>
      <div className="sales-chart__canvas-wrap">
        <canvas ref={canvasRef} className="sales-chart__canvas" />
      </div>
    </div>
  )
}

export default SalesChart