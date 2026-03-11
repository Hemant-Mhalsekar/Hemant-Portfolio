import React from 'react';

const Button = ({ children, variant = 'primary', href, onClick, className = '', ...props }) => {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-[250ms] ease-out cursor-pointer select-none';

  const variants = {
    primary:
      'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-[0_8px_25px_rgba(99,102,241,0.45)] hover:scale-[1.03] hover:-translate-y-0.5',
    secondary:
      'bg-transparent border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 hover:scale-[1.02] hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5 hover:-translate-y-0.5',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
