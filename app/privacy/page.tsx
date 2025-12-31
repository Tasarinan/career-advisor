export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Last updated: December 31, 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">1. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We collect information you provide directly to us, such as when you create an account, 
            use our services, or contact us for support. This may include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Account information (email address, name)</li>
            <li>Career-related queries and generated roadmaps</li>
            <li>Usage data and preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">2. How We Use Your Information</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Provide, maintain, and improve our services</li>
            <li>Generate personalized career roadmaps</li>
            <li>Send you technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">3. Data Security</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We take reasonable measures to help protect your personal information from loss, theft, 
            misuse, unauthorized access, disclosure, alteration, and destruction. All data is 
            transmitted using secure protocols (HTTPS) and stored using industry-standard encryption.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">4. Third-Party Services</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            We may use third-party services to help us operate our services, such as:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 dark:text-slate-400">
            <li>Supabase for authentication and data storage</li>
            <li>AI providers for roadmap generation</li>
            <li>Payment processors for subscription management</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">5. Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            You have the right to access, update, or delete your personal information at any time. 
            You can do this through your account settings or by contacting us directly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">6. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:privacy@careeradvisor.app" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              privacy@careeradvisor.app
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
