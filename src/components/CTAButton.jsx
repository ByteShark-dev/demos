import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'cta-primary',
  secondary: 'cta-secondary',
};

function isExternalHref(href) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function CTAButton({ href, children, variant = 'primary', className = '', external }) {
  const classes = `${variantClasses[variant] ?? variantClasses.primary} ${className}`.trim();
  const shouldOpenExternal = external ?? isExternalHref(href);

  if (shouldOpenExternal) {
    return (
      <a className={classes} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} to={href}>
      {children}
    </Link>
  );
}

