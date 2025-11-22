import { memo } from "react";

function Footer() {
  return (
    <footer className="bottom-0 relative bg-gray-700 px-2 py-4 w-full text-white">
      <div className="flex justify-between items-center mx-auto max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        <p className="text-xs">Copyright © 2025 | CodeYogi</p>
        <p className="text-xs">Powered by CodeYogi</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
