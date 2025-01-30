export function NavigationBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold">Web Dev Services</a>
          <div className="space-x-4">
            <a href="/en" className="text-gray-600 hover:text-gray-900">EN</a>
            <a href="/vi" className="text-gray-600 hover:text-gray-900">VI</a>
            <a href="/zh-TW" className="text-gray-600 hover:text-gray-900">中文</a>
          </div>
        </div>
      </div>
    </nav>
  )
} 