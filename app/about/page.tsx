export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        About Career Advisor
      </h1>
      
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Career Advisor is an AI-powered career planning tool designed to help professionals 
            at all stages of their journey. We create personalized roadmaps that guide you 
            through the skills, milestones, and resources needed to achieve your career goals.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">How It Works</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Enter Your Target Role</h3>
                <p className="text-slate-600 dark:text-slate-400">Simply type in the job title or career path you&apos;re interested in.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">AI Generates Your Roadmap</h3>
                <p className="text-slate-600 dark:text-slate-400">Our AI analyzes industry requirements and creates a comprehensive learning path.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">Visualize & Plan</h3>
                <p className="text-slate-600 dark:text-slate-400">Explore your interactive roadmap and start planning your career journey.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Features</h2>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              AI-powered career roadmap generation
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Interactive visual roadmap with zoom and navigation
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Download roadmap as image
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Supports any profession or career path
            </li>
          </ul>
        </section>

        <section className="text-center">
          <p className="text-slate-600 dark:text-slate-400">
            Have questions? Contact us at{' '}
            <a href="mailto:support@careeradvisor.app" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              support@careeradvisor.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
