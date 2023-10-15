import * as React from 'react';
import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types'
import { mergeClasses } from '../../lib/utils';

const iconButtonVariants = cva(
  'flex justify-center items-center hover:bg-gray-100 active:bg-gray-200 rounded-lg p-1.5 transition-colors duration-200 [&_svg]:stroke-gray-600 [&_svg]:hover:stroke-gray-700',
  {
    variants: {
      size: {
        md: '[&_svg]:w-6 [&_svg]:h-6',
        lg: '[&_svg]:w-8 [&_svg]:h-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);


const IconButton = React.forwardRef(
  (
    {
      className,
      size,
      showTooltip = false,
      tooltipText = '',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={mergeClasses(
          'relative',
          iconButtonVariants({ size }),
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {showTooltip && tooltipText.length > 0 && (
          <span className="absolute -top-8 rounded-lg bg-gray-200 px-2 py-1 text-sm">
            {tooltipText}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
IconButton.propTypes = {
  asChild: PropTypes.bool,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node,
}

export default IconButton;
