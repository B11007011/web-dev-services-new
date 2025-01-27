'use client'

const Technologies = () => {
  const techStacks = [
    {
      category: 'Frontend',
      techs: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 }
      ]
    },
    {
      category: 'Backend',
      techs: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 80 }
      ]
    },
    {
      category: 'Mobile',
      techs: [
        { name: 'React Native', level: 85 },
        { name: 'Flutter', level: 75 },
        { name: 'iOS', level: 70 },
        { name: 'Android', level: 70 }
      ]
    },
    {
      category: 'DevOps',
      techs: [
        { name: 'AWS', level: 80 },
        { name: 'Docker', level: 85 },
        { name: 'CI/CD', level: 80 },
        { name: 'Kubernetes', level: 75 }
      ]
    }
  ]

  return (
    <section className="py-20 bg-gray-50" id="technologies">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Tech Stack</h2>
          <p className="text-xl text-gray-600">
            We use cutting-edge technologies to build modern solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStacks.map((stack, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">{stack.category}</h3>
              <div className="space-y-6">
                {stack.techs.map((tech, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-blue-600">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies 