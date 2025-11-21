import { memo } from "react";
import { Link } from "react-router-dom";

function Pagination() {
  return (
    <div className="flex gap-1 mt-8">
      <Link className="bg-white hover:bg-primary-dark focus:bg-primary-dark border border-primary-dark w-8 h-8 text-primary-dark hover:text-white focus:text-white text-center">
        1
      </Link>
      <Link className="bg-white hover:bg-primary-dark focus:bg-primary-dark border border-primary-dark w-8 h-8 text-primary-dark hover:text-white focus:text-white text-center">
        2
      </Link>
      <Link className="bg-white hover:bg-primary-dark focus:bg-primary-dark border border-primary-dark w-8 h-8 text-primary-dark hover:text-white focus:text-white text-center">
        {"\u2192"}
      </Link>
    </div>
  );
}

export default memo(Pagination);
