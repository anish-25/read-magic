import * as React from 'react';
import PropTypes from 'prop-types'
import { mergeClasses } from '../../lib/utils';
import Typography from '../general/typography';


const Tag = React.forwardRef(
  ({ label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={mergeClasses(
          'flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1',
          className
        )}
        {...props}
      >
        <Typography variant="body3" className="font-medium">
          {label}
        </Typography>
      </div>
    );
  }
);

Tag.displayName = 'Tag';
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string
}
export default Tag;
