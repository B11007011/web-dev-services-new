'use client'

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your requirements and plan the perfect solution'
    },
    {
      number: '02',
      title: 'Design',
      description: 'Create beautiful, functional designs that engage users'
    },
    {
      number: '03',
      title: 'Development',
      description: 'Build with modern technologies and best practices'
    },
    {
      number: '04',
      title: 'Launch',
      description: 'Deploy and optimize for the best performance'
    }
  ]

  return (
    <section className="py-20 bg-gray-50" id="process">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Process</h2>
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-200 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-8 shadow-lg relative z-10">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {/* Connection Dot */}
                <div className="hidden md:block absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process 