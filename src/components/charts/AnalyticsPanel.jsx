import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CIRCULATION_SERIES, GENRE_DISTRIBUTION, ROLE_ACTIVITY } from '../../store/mockData'

function ChartCard({ title, description, children }) {
  return (
    <div className="glass-panel flex h-full flex-col gap-5">
      <div className="space-y-1">
        <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
        <p className="text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
      </div>
      <div className="min-h-[260px] flex-1">{children}</div>
    </div>
  )
}

export function AnalyticsPanel({ role }) {
  const activity = ROLE_ACTIVITY[role]

  return (
    <div className="grid gap-6 xl:grid-cols-[1.45fr_minmax(0,1fr)]">
      <ChartCard
        title="Circulation pulse"
        description="Live borrowing rhythm, returns, and campus footfall across the week."
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CIRCULATION_SERIES}>
            <defs>
              <linearGradient id="issuesGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="returnsGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.72} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="var(--chart-axis)" />
            <YAxis tickLine={false} axisLine={false} stroke="var(--chart-axis)" />
            <Tooltip
              cursor={{ stroke: 'rgba(56, 189, 248, 0.24)', strokeWidth: 1 }}
              contentStyle={{
                borderRadius: 18,
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(15,23,42,0.84)',
                color: '#fff',
              }}
            />
            <Area
              type="monotone"
              dataKey="issues"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#issuesGradient)"
            />
            <Area
              type="monotone"
              dataKey="returns"
              stroke="#34d399"
              strokeWidth={3}
              fill="url(#returnsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid gap-6">
        <ChartCard
          title="Genre composition"
          description="Balanced collection growth across high-demand reading zones."
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={GENRE_DISTRIBUTION}
                dataKey="value"
                innerRadius={62}
                outerRadius={96}
                paddingAngle={4}
              >
                {GENRE_DISTRIBUTION.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(15,23,42,0.84)',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Role performance"
          description="Operational momentum and engagement signals tailored to the active workspace."
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity} layout="vertical" margin={{ left: 18 }}>
              <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
              <XAxis type="number" tickLine={false} axisLine={false} stroke="var(--chart-axis)" />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                stroke="var(--chart-axis)"
                width={100}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(15,23,42,0.84)',
                  color: '#fff',
                }}
              />
              <Bar dataKey="value" radius={[999, 999, 999, 999]} fill="#818cf8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
