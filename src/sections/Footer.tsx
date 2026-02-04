const steps = [
  {
    icon: '/icon_1.png',
    title: 'Share Your Requirement',
  },
  {
    icon: '/icon_2.png',
    title: 'Verify Your Contact',
  },
  {
    icon: '/icon_3.png',
    title: 'Expert Assistance',
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            How Unifest Works
          </h2>
          <p className="text-base text-slate-600">
            Get connected to a dedicated expert in seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 max-w-lg mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-2 text-center aspect-square flex flex-col items-center justify-center">
              {/* Icon */}
              <div className="flex justify-center mb-2">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs font-semibold text-slate-900 leading-tight">
                {index === 0 && (
                  <>
                    Share Your<br />Requirement
                  </>
                )}
                {index === 1 && (
                  <>
                    Verify Your<br />Contact
                  </>
                )}
                {index === 2 && (
                  <>
                    Expert<br />Assistance
                  </>
                )}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
