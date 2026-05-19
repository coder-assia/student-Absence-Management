export default function AdminDashboard() {
  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500">Students</p>
        <h2 className="text-2xl font-bold">120</h2>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500">Teachers</p>
        <h2 className="text-2xl font-bold">12</h2>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-gray-500">Absences</p>
        <h2 className="text-2xl font-bold">18</h2>
      </div>

    </div>
  );
}