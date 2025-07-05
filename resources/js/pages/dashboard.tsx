import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

// Datos ficticios
const bookingsData = [
  { destination: 'Cancún', bookings: 120 },
  { destination: 'París', bookings: 90 },
  { destination: 'Tokio', bookings: 75 },
  { destination: 'Machu Picchu', bookings: 50 },
  { destination: 'Nueva York', bookings: 110 },
];

const revenueData = [
  { month: 'Ene', revenue: 12000 },
  { month: 'Feb', revenue: 15000 },
  { month: 'Mar', revenue: 17000 },
  { month: 'Abr', revenue: 14000 },
  { month: 'May', revenue: 21000 },
  { month: 'Jun', revenue: 19000 },
];

const clientTypeData = [
  { name: 'Parejas', value: 400 },
  { name: 'Familias', value: 300 },
  { name: 'Empresarial', value: 200 },
  { name: 'Backpackers', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Gráfico de barras: Reservas por destino */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Reservas por destino</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destination" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de líneas: Ingresos mensuales */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Ingresos mensuales (USD)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico circular: Tipos de clientes */}
        <div className="bg-white shadow rounded p-4 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Distribución por tipo de cliente</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {clientTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
}
