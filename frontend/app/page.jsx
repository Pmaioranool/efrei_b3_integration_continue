export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Student Management System
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <p className="text-gray-700">Frontend is successfully running!</p>
        {/* Next step: integrate axios to fetch students from backend */}
      </div>
    </main>
  )
}
