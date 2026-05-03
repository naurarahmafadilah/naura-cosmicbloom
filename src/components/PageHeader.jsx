import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="mb-10">

      {/* TITLE */}
      <h1 className="text-4xl font-[var(--font-playfair)] text-teks">
        {title}
      </h1>

      {/* LINE */}
      <div className="w-20 h-[2px] bg-primary mt-3 mb-4"></div>

      {/* BREADCRUMB */}
      <div className="text-sm text-teks-soft flex items-center gap-2">

        {breadcrumb?.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i !== 0 && <span>/</span>}

            {item.link ? (
              <Link to={item.link} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-teks">{item.label}</span>
            )}
          </span>
        ))}

      </div>

      {/* OPTIONAL CONTENT */}
      {children && <div className="mt-4">{children}</div>}

      {/* TAGLINE */}
      <p className="mt-4 text-primary text-lg font-[var(--font-greatvibes)]">
        Temukan gayamu sendiri ✨
      </p>

    </div>
  );
};

export default PageHeader;