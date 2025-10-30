export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white">
      <div className="max-w-6xl mx-auto p-6 sm:p-8 grid gap-20 sm:grid-cols-3 text-sm text-gray-600">
        <div>
          <div className="font-bold text-3xl text-gray-900">Nexora</div>
          <p className="mt-2 text-base">Quality apparel curated for everyday comfort and style.</p>
        </div>
        <div>
          <div className="font-semibold text-lg text-gray-900">Support</div>
          <ul className="mt-2 space-y-1 text-base">
            <li><a className="hover:text-gray-900" href="#">Help Center</a></li>
            <li><a className="hover:text-gray-900" href="#">Shipping & Returns</a></li>
            <li><a className="hover:text-gray-900" href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-lg">Company</div>
          <ul className="mt-2 space-y-1 text-base">
            <li><a className="hover:text-gray-900" href="#">About</a></li>
            <li><a className="hover:text-gray-900" href="#">Careers</a></li>
            <li><a className="hover:text-gray-900" href="#">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-gray-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Nexora. All rights reserved.</span>
          <span>Made with ❤️</span>
        </div>
      </div>
    </footer>
  );
}


