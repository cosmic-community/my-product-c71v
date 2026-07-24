import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="text-2xl">🚀</span>
              <span className="text-gray-900">My Product</span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              The all-in-one SaaS platform to help your business ship faster and
              grow smarter.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/features" className="hover:text-brand-600">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-600">Pricing</Link></li>
              <li><Link href="/testimonials" className="hover:text-brand-600">Testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/docs" className="hover:text-brand-600">Documentation</Link></li>
              <li><Link href="/#faq" className="hover:text-brand-600">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Get Started</h3>
            <p className="mt-4 text-sm text-gray-500">
              Ready to grow your business? Choose a plan that works for you.
            </p>
            <Link
              href="/pricing"
              className="mt-4 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} My Product. All rights reserved.
        </div>
      </div>
    </footer>
  )
}