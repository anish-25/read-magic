
import * as React from 'react';
import { mergeClasses } from '../../lib/utils';
import propTypes from 'prop-types'
import BouncingDotsLoader from './bouncing-dots';

const Button = React.forwardRef(
  ({ className,loader, ...props }, ref) => {
    const Comp = 'button';
    return (
      <Comp
        className={mergeClasses(
          'inline-flex items-center justify-center rounded-xl min-w-[150px] h-[40px] bg-gray-900 px-4 py-1.5 font-medium text-gray-50 transition-colors duration-200 hover:bg-gray-700 active:bg-gray-800',
          className
        )}
        ref={ref}
        {...props}
      >
        {
          loader ?
          <span className='flex w-full h-full justify-center items-center'>
            <BouncingDotsLoader /> 
          </span>
            :
            <span className={mergeClasses(' justify-center items-center space-x-2',loader?'invisible':'flex')}>
              {props?.children}
            </span>
        }
      </Comp>
    );
  }
);

Button.displayName = 'Button';
Button.propTypes = {
  className: propTypes.string,
  loader: propTypes.bool
}

export default Button;
