import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="mb-10 animate-fade-in">

      <h1 className="text-5xl font-playfair text-primary-dark tracking-tight">
        {title}
      </h1>

      <div className="w-16 h-[3px] bg-secondary-light mt-4 mb-5 rounded-full"></div>

      <nav className="text-sm font-quicksand font-medium flex items-center gap-2">
        {breadcrumb?.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i !== 0 && <span className="text-secondary-dark/30">/</span>}

            {item.link ? (
              <Link 
                to={item.link} 
                className="text-secondary-dark/60 hover:text-primary-light transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-primary-dark">{item.label}</span>
            )}
          </span>
        ))}
      </nav>

      {children && <div className="mt-6">{children}</div>}

    </div>
  );
};

export default PageHeader;