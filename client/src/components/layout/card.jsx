import { mergeClasses } from "../../lib/utils";
import PropTypes from 'prop-types'

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={mergeClasses(
        'rounded-xl bg-gray shadow-md dark:bg-gray-100 dark:shadow-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
export default Card;
