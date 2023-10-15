import * as React from 'react';

import { mergeClasses } from '../../lib/utils';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
const CustomLink = React.forwardRef(
  (
    {
      noCustomization,
      children = null,
      className = '',
      externalLink = false,
      withUnderline = false,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        {...props}
        target={externalLink ? '_blank' : '_self'}
        ref={ref}
        className={mergeClasses(
          noCustomization ??
            'text-base font-medium text-gray-600 transition-all hover:text-gray-900 active:text-gray-600',
          withUnderline
            ? 'underline underline-offset-4 transition-all hover:text-gray-900 active:text-gray-600'
            : '',
          className
        )}
      >
        {children}
      </Link>
    );
  }
);

CustomLink.displayName = 'Link';
CustomLink.propTypes = {
  noCustomization: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  externalLink: PropTypes.bool,
  withUnderline: PropTypes.bool,
}
export default CustomLink;
